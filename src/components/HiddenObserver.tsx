import useIntersectionObserver from "@/utils/intersectionObserver";
import React from "react";

type HiddenObserverProps = {
	onEndOfRow?: (_x: boolean) => void;
};

const HiddenObserver = (props: HiddenObserverProps) => {
	const { onEndOfRow } = props;
	const ref = React.useRef<HTMLSpanElement>(null);
	const entry = useIntersectionObserver(ref, {});
	const isEndOfTable = !!entry?.isIntersecting;

	React.useEffect(() => {
		if (onEndOfRow) {
		onEndOfRow(isEndOfTable);
		}
	}, [isEndOfTable]);

	// const {} =
	return <span className="inline-block py-4 px-3 w-full" ref={ref}></span>;
};
  
export default HiddenObserver;