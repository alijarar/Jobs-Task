export interface Job {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?:string
}
  
export interface DialogProps {
  refetch: () => void;
}