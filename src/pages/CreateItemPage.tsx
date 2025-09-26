import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { BackButton } from '../components/BackButton';
import { Button } from '../components/Button';
import { UploadIcon } from '../components/icons/Icons';
import { useAppContext } from '../contexts/AppContext';
import { assetsApi } from '../services/api';
import { useAsyncAction } from '../hooks/useApi';

export const CreateItemPage: React.FC = () => {
  const { isAuthenticated, openWalletModal } = useAppContext();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    collection: '',
    royalties: '',
    enableFractional: false,
    totalShares: 100,
    sharePrice: 0.01,
  });

  const { execute: createAsset, loading: creating } = useAsyncAction();

  const handleFileChange = useCallback((selectedFile: File | undefined) => {
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files?.[0]);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files?.[0]);
  }, [handleFileChange]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      openWalletModal();
      return;
    }

    if (!file || !formData.name) {
      toast.error('Please provide a file and name for your NFT');
      return;
    }

    const submitData = new FormData();
    submitData.append('file', file);
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('collection', formData.collection);
    submitData.append('royalties', formData.royalties);
    
    if (formData.enableFractional) {
      submitData.append('totalShares', formData.totalShares.toString());
      submitData.append('sharePrice', formData.sharePrice.toString());
    }

    const result = await createAsset(
      (data) => assetsApi.create(data),
      submitData
    );

    if (result) {
      toast.success('NFT created successfully!');
      navigate(`/asset/${result.id}`);
    } else {
      toast.error('Failed to create NFT. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <BackButton className="absolute top-24 left-6" />
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">Create Your NFT</h1>
          <p className="text-text-secondary mb-6">
            Connect your wallet to start creating and selling your digital assets
          </p>
          <Button onClick={openWalletModal} className="px-8 py-3">
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <BackButton className="mb-6" />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Item</h1>
          <p className="text-text-secondary">
            Upload your work and create a unique digital asset
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Image, Video, Audio, or 3D Model *
              </label>
              <div 
                className="border-2 border-dashed border-secondary rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors group"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={onFileChange} 
                  accept="image/*,video/*,audio/*,.glb,.gltf" 
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-text-secondary">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <UploadIcon className="mx-auto h-16 w-16 text-text-secondary group-hover:text-primary transition-colors"/>
                    <div>
                      <p className="text-lg font-medium text-text-primary">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-text-secondary mt-1">
                        or <span className="text-primary font-medium">browse files</span>
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary">
                      PNG, JPG, GIF, MP4, MP3, GLB up to 100MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fractional Ownership */}
            <div className="bg-surface rounded-xl p-6 border border-secondary">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-text-primary">Fractional Ownership</h3>
                  <p className="text-sm text-text-secondary">Allow others to buy shares of your NFT</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableFractional}
                  onChange={(e) => handleInputChange('enableFractional', e.target.checked)}
                  className="w-5 h-5 text-primary bg-background border-secondary rounded focus:ring-primary"
                />
              </div>
              
              {formData.enableFractional && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-secondary"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Total Shares
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="10000"
                        value={formData.totalShares}
                        onChange={(e) => handleInputChange('totalShares', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Price per Share (SUI)
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        min="0.001"
                        value={formData.sharePrice}
                        onChange={(e) => handleInputChange('sharePrice', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-background border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary bg-background rounded-lg p-3">
                    <p><strong>Total Value:</strong> {(formData.totalShares * formData.sharePrice).toFixed(3)} SUI</p>
                    <p><strong>Minimum Investment:</strong> {formData.sharePrice} SUI (1 share)</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Item name"
                className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Provide a detailed description of your item"
                className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none resize-none"
              />
            </div>

            <div>
              <label htmlFor="collection" className="block text-sm font-medium text-text-secondary mb-2">
                Collection
              </label>
              <input
                type="text"
                id="collection"
                value={formData.collection}
                onChange={(e) => handleInputChange('collection', e.target.value)}
                placeholder="e.g. My First Collection"
                className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
              />
              <p className="text-xs text-text-secondary mt-1">
                This is the collection where your item will appear
              </p>
            </div>

            <div>
              <label htmlFor="royalties" className="block text-sm font-medium text-text-secondary mb-2">
                Royalties (%)
              </label>
              <input
                type="number"
                id="royalties"
                min="0"
                max="10"
                step="0.1"
                value={formData.royalties}
                onChange={(e) => handleInputChange('royalties', e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
              />
              <p className="text-xs text-text-secondary mt-1">
                Suggested: 0%, 2.5%, 5%, 10%. Maximum is 10%
              </p>
            </div>

            {/* Preview Card */}
            <div className="bg-surface rounded-xl p-6 border border-secondary">
              <h3 className="font-semibold mb-4">Preview</h3>
              <div className="bg-background rounded-lg p-4">
                <div className="aspect-square bg-secondary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-text-secondary">Preview will appear here</span>
                  )}
                </div>
                <h4 className="font-semibold text-text-primary">
                  {formData.name || 'Untitled'}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {formData.collection || 'No collection'}
                </p>
                {formData.enableFractional && (
                  <div className="mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block">
                    Fractional NFT
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={creating || !file || !formData.name}
              className="w-full py-4 text-lg"
            >
              {creating ? 'Creating...' : 'Create Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};