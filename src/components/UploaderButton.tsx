"use client";

import { UploadButton } from "../utils/uploadThing";

export default function ImageButton({setImage , setLoader} : {
    setImage : (args : string) => void ,
    setLoader : (args : boolean) => void 
}) {
  return (
      <UploadButton
        className="bg-black"
        endpoint="imageUploader"
        onUploadBegin={() =>
            setLoader(true)
        }
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          setImage(res[0].url)
          setLoader(false)

        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
  );
}
