const React = typeof module !== "undefined" ? require("react") : window.React;

const Page = ({ value }) => {
  const [state, setState] = React.useState(value);
    return React.createElement(
        "div",
        {color: "forestgreen", backgroundcolor: "lightgreen", align: "center",  width: "80px", height: "80px", border: "1px solid"},
        React.createElement(
            "p",
            {
                style: {color: "darkgreen", align: "center", fontSize: "40px", fontFamily: "Helvetica Neue"},

            },
            "Increment"
        ),
        React.createElement(
            "button",
            {
                style: {color: "white", backgroundColor: "mediumseagreen", align: "center", fontSize: "40px",
                    width: "80px", height: "80px", border: "1px solid"},
                onClick: () => {
                    setState((state) => state + 1);
                }
            },
            state
        ),
    );
};

Page.getProps = async () => {
  // mock for apis
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ value: 1 });
    }, 1000);
  });
};

if (typeof module !== "undefined") {
  module.exports = Page;
}