import { render } from "@testing-library/react-native";
import Lots from "../src/screens/SearchResult";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: jest.fn(),
  };
});

const route = {
  params: {
    lots: 2,
  },
};

describe("Lots", () => {
  it("renders without crash", () => {
    render(<Lots route={route} />);
  });

  it("matches snapshot", () => {
    const tree = render(<Lots route={route} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("has component with req TestId", () => {
    const tree = render(<Lots route={route} />);
    expect(tree.findByTestId("lots")).toBeTruthy();
  });

  it("has 3 children", () => {
    const tree = render(<Lots route={route} />);
    //@ts-ignore
    expect(tree.toJSON().children.length).toBe(3);
  });
});
