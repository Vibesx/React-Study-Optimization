import React from "react";

const DemoOutput = (props) => {
	console.log("DemoOutput RUNNING!");
	return <p>{props.show ? "This is new!" : ""}</p>;
};

// React.memo remembers the last state of the DemoOutput props and only rerenders the component if those props change
// it is only applicable to functional components (not class based components)
// NOTE: it compares values of props, meaning if props contain a non-primitive (object, function, etc), on rerender it will not pass the comparison
// for objects we use useCallback()
export default React.memo(DemoOutput);
