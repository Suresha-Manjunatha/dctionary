import { render } from "@testing-library/react-native";
import Button from "../src/components/Button";
import Home from "../src/screens/Home";

const props = {
  title: " string",
  onPress: () => {},
  style: {},
  loading: true,
  disabled: true,
};
describe("Home", () => {
  // it("renders Home screen without crash", () => {
  //   render(
  //     <Button
  //       title={props.title}
  //       onPress={props.onPress}
  //       style={props.style}
  //       loading={props.loading}
  //       disabled={props.disabled}
  //     />
  //   );
  // });
  test("test home screen", () => {
    const tree = render(<Home />);
  });
});
