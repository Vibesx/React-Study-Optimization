import React, { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

import "./App.css";

function App() {
	const [showParagraph, setShowParagraph] = useState(false);
	const [allowToggle, setAllowToggle] = useState(false);

	console.log("Main RUNNING!");

	// useCallback stores the object value in memory and gets it from there on rerender, so that memo child components are not re-rendered because of props changing
	// it takes two arguments, the function body and an array of dependencies, same as useEffect (same rules too)
	const toggleParagraphHandlers = useCallback(() => {
		// more info on closures: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
		// when Javascript stores the function with useCallback, it also stores a snapshot of allowToggle particular for that instance of the function
		// if allowToggle changes outside the function, the stored function won't know about it
		// that is why it is important to put these values as dependencies inside the dependencies array
		if (allowToggle) {
			setShowParagraph((prevShowParagraph) => {
				return !prevShowParagraph;
			});
		}
	}, [allowToggle]);

	const allowToggleHandler = () => {
		setAllowToggle(true);
	};

	return (
		<div className="app">
			<h1>Hi there!</h1>
			<DemoOutput show={showParagraph}></DemoOutput>
			<Button onClick={allowToggleHandler}>Allow Toggling</Button>
			<Button onClick={toggleParagraphHandlers}>Show Paragraph!</Button>
		</div>
	);
}

/** Similar to useCallback, we can use useMemo to remember a piece of logic
 * ex:
 * const {items} = props;
 * const sortedList = useMemo(() => {
 * 	return items.sort((a, b) => a-b);
 * }, [items]);
 *
 * The useMemo would be triggered whenever items would change, as it uses a dependency array like useEffect and useCallback
 *
 * We can also replace objects passed as props with useMemo returning those objects, in order to have the same instance on every re-renders (re-renders cause rewriting, even if the values of the object didn't change)
 * ex:
 *
 * <DemoList items={[...]}/>
 * TO
 * const listItems = useMemo(() => [...], [])
 * <DemoList items={listItems}/>
 *
 */

export default App;
