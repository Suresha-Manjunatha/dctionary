import { render } from "@testing-library/react-native";
import Home from "../src/screens/Home";

// jest.mock("@react-navigation/native", () => {
//   return {
//     useNavigation: jest.fn(),
//   };
// });

describe("Home", () => {
  it("renders Home screen without crash", () => {
    render(<Home />);
  });
});
