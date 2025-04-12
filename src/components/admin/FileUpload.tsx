
import React, { useState, ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, File } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  id: string;
  accept: string;
  maxSizeMB?: number;
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
}

const FileUpload = ({
  id,
  accept,
  maxSizeMB = 10,
  label,
  onChange,
  value,
  className,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Função para converter MB para bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(null);
      setPreview(null);
      setFileName(null);
      return;
    }

    // Validação de tamanho
    if (file.size > maxSizeBytes) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo permitido é de ${maxSizeMB}MB`,
        variant: "destructive"
      });
      e.target.value = '';
      return;
    }

    // Preview para imagens
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      // Para vídeos, apenas mostramos o nome do arquivo
      setPreview(null);
    }

    setFileName(file.name);
    onChange(file);
  };

  const clearFile = () => {
    onChange(null);
    setPreview(null);
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isVideo = accept.includes('video/');
  const isImage = accept.includes('image/');

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {fileName && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFile}
            className="h-7 px-2 text-destructive hover:text-destructive/80"
          >
            <X size={16} className="mr-1" /> Remover
          </Button>
        )}
      </div>
      
      {!fileName ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => inputRef.current?.click()}>
          <Upload size={24} className="text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">
            Clique para selecionar ou arraste um {isVideo ? 'vídeo' : 'arquivo'} aqui
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {isVideo 
              ? `MP4, até ${maxSizeMB}MB` 
              : isImage 
                ? 'JPG, PNG' 
                : 'Arquivo'}
          </p>
        </div>
      ) : (
        <div className="border rounded-md p-2">
          {preview && isImage ? (
            <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden rounded bg-muted">
              <img 
                src={preview} 
                alt="Preview" 
                className="object-cover max-h-[200px] rounded"
              />
            </div>
          ) : (
            <div className="flex items-center p-2">
              <File size={20} className="mr-2 text-blue-500" />
              <span className="text-sm truncate max-w-[250px]">{fileName}</span>
            </div>
          )}
        </div>
      )}

      <Input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
