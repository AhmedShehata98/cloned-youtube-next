import React from "react";

interface ISpinnerProps {
  withText: boolean;
}
function Spinner({ withText }: ISpinnerProps) {
  return (
    <div className="w-28 h-24 flex flex-col items-center gap-3 justify-center m-auto">
      <span className="inline-block w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full shadow-sm animate-spin"></span>
      {withText ? <p>Loading ..</p> : null}
    </div>
  );
}

export default Spinner;
