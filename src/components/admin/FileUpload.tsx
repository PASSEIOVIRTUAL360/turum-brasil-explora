
import React, { useState, ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, File, Video, Compass } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  id: string;
  accept: string;
  maxSizeMB?: number;
  label: string;
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
  showPreview?: boolean;
}

const FileUpload = ({
  id,
  accept,
  maxSizeMB = 10,
  label,
  onChange,
  value,
  className,
  showPreview = true,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [is360Image, setIs360Image] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Função para converter MB para bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(null);
      setPreview(null);
      setFileName(null);
      setIsVideo(false);
      setIs360Image(false);
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

    // Determinar tipo de arquivo
    setIsVideo(file.type.startsWith('video/'));
    setIs360Image(checkIf360Image(file.name));

    // Preview para imagens
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      // Para vídeos, criamos um URL temporário para preview
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    }

    setFileName(file.name);
    onChange(file);
  };

  // Função heurística para determinar se é uma imagem 360° baseado no nome ou metadados
  // Em uma implementação completa, seria necessário analisar os metadados EXIF
  const checkIf360Image = (filename: string): boolean => {
    const lowerName = filename.toLowerCase();
    return lowerName.includes('360') || 
           lowerName.includes('panorama') || 
           lowerName.includes('spherical') ||
           lowerName.includes('pano');
  };

  const clearFile = () => {
    if (preview && isVideo) {
      URL.revokeObjectURL(preview);
    }
    onChange(null);
    setPreview(null);
    setFileName(null);
    setIsVideo(false);
    setIs360Image(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {is360Image && <span className="ml-2 text-turquesa">🌀 360°</span>}
          {isVideo && <span className="ml-2 text-coral">🎥 Vídeo</span>}
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
              ? `MP4, MOV, até ${maxSizeMB}MB` 
              : accept.includes('image/') 
                ? (accept.includes('360') ? 'Imagem 360° (JPG, PNG)' : 'JPG, PNG, WEBP') 
                : 'Arquivo'}
          </p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          {showPreview && (
            <>
              {preview && isVideo ? (
                <div className="relative aspect-video w-full flex items-center justify-center bg-black">
                  <video 
                    ref={videoRef}
                    src={preview} 
                    controls
                    className="max-h-[200px] max-w-full"
                  />
                </div>
              ) : preview && !isVideo ? (
                <div className={`relative ${is360Image ? 'aspect-square' : 'aspect-video'} w-full flex items-center justify-center overflow-hidden rounded-t bg-muted`}>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className={`object-cover max-h-[200px] w-full ${is360Image ? 'cursor-move' : ''}`}
                  />
                  {is360Image && (
                    <div className="absolute bottom-2 right-2">
                      <Button size="sm" className="bg-[#00B4D8] hover:bg-[#0095b3]">
                        Visualizar em 360°
                      </Button>
                    </div>
                  )}
                </div>
              ) : null}
            </>
          )}
          <div className="flex items-center p-3">
            {isVideo ? (
              <Video size={20} className="mr-2 text-coral" />
            ) : is360Image ? (
              <Compass size={20} className="mr-2 text-turquesa" />
            ) : (
              <File size={20} className="mr-2 text-blue-500" />
            )}
            <span className="text-sm truncate max-w-[250px]">{fileName}</span>
          </div>
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
