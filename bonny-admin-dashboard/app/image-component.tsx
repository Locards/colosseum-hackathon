import { useState } from "react";

export default function ImageComponent({ children, src } : { children: string, src: any}) {

    const [isOpen, setOpen] = useState<boolean>(false);
  
    function handleShowDialog() {
        setOpen(!isOpen);
    }

    return(<>
          <div
            onClick={handleShowDialog}
          >{children}</div>
          
          {isOpen && (
            <dialog
              className="dialog"
              style={{ position: 'absolute' }}
              open
              onClick={handleShowDialog}
            >
              <img
                className="image"
                src={src}
                onClick={handleShowDialog}
                alt="no image"
              />
            </dialog>
          )}
        </>);
  }

