import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProfilePhoto } from "../shared/ProfilePhoto";
import { Textarea } from "@/components/ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";
import { toast } from "sonner";

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
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const changeHandler = (e: any) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get("inputText") as string;
    try {
      await createPostAction(inputText, selectedFile);
    } catch (err) {
      console.log("error occured", err);
    }
    setInputText("");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
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
        <form
          action={(formData) => {
            const promise = postActionHandler(formData);
            toast.promise(promise, {
              loading: "Creating post...",
              success: "Post created",
              error: "Failed to create post",
            });
          }}
        >
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              onChange={changeHandler}
              value={inputText}
              className="border-none text-lg h-50"
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="my-4">
            {selectedFile && (
              <Image
                src={selectedFile}
                alt="preview-image"
                width={400}
                height={400}
              />
            )}
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
              <Button
                type="submit"
                onClick={() => console.log("🚀 Submit button clicked")}
              >
                Post
              </Button>
            </div>
          </DialogFooter>
        </form>
        <Button onClick={() => inputRef?.current?.click()} variant={"ghost"}>
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
