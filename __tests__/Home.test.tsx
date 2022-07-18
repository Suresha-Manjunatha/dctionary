import { render } from "@testing-library/react-native";
import Home from "../src/screens/Home";

describe("Home", () => {
  it("renders Home screen without crash", () => {
    render(<Home />);
  });
});
