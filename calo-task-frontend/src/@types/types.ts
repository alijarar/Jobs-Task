export interface Job {
    id: string;
    title: string;
    description: string;
    category: string;
  imageData?: {
    blurhash: string,
    imageUrl: string,
  }
}
  
export interface DialogProps {
  refetch: () => void;
}