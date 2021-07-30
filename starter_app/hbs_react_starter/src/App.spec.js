import { expect, test } from "@jest/globals";
import React from "react";
import  renderer from "react-test-renderer";
import { describe } from "yargs";
import {ColorBox} from "./App";


describe('My Test Suite', () => {
  it('should show my first test', () => {
    expect(true).toEqual(true);
  });
});

describe("ColorBox component", () => {
  test('snapshot renders', () => {
    const component = renderer.create(<ColorBox height={80} width={80} color="sienna" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})