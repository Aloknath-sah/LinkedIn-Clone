import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProfilePhoto } from "../shared/ProfilePhoto";
import { Textarea } from "@/components/ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";

export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: any;
  open: boolean;
  src: string;
}) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("")
    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
            const dataUrl = await readFileAsDataUrl(file)
            setSelectedFile(dataUrl)
        }
    }

  return (
    <Dialog open={open}>
      <form>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle className="flex gap-3">
              <ProfilePhoto src={src} />
              <div>
                <h1>Alok</h1>
                <p className="font-light text-xs">Post to anyone</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
           
              <div className="flex flex-col">
                <Textarea
                  id="name"
                  name="inputText"
                  className="border-none text-lg h-50"
                  placeholder="Share your thoughts..."
                  
                />
              </div>
              <div className="my-4">
                {
                    selectedFile && (<Image src={selectedFile} alt="preview-image" width={400} height={400} />)
                }
              </div>
            
          </div>
          <DialogFooter>
            <div className="flex items-center-gap">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
            
          </DialogFooter>
          <Button onClick={() => inputRef?.current?.click()} variant={'ghost'}>
        <Images className="text-blue-500" alt="media" />
        <p>Media</p>
      </Button>
        </DialogContent>
      </form>
      
    </Dialog>
  );
}
