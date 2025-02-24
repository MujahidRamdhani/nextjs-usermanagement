import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface DeleteButtonProps {
  userId: number;
  handleDelete: (id: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ userId, handleDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" className="bg-red-400 hover:bg-red-600" >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogDescription>Apakah Anda yakin ingin menghapus data ini?</DialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={() => setOpen(false)} variant="outline">
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete(userId);
              setOpen(false);
            }}
          >
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
