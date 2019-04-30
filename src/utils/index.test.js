import React from 'react';
import { generateSquads } from './index';

let func = require('./index');

describe('generateSquad Function tests ', () => {
  it("function gets called", () => {
      let list = [];
      let num = 0;
      const funcSpy = jest.spyOn(func,'generateSquads');
      generateSquads(list,num);
      expect(funcSpy).toHaveBeenCalledTimes(1);
      funcSpy.mockRestore();
  });

  it("Check function parameters", () => {
      let list = [];
      let num = 0;
      const funcSpy = jest.spyOn(func,'generateSquads');
      generateSquads(list,num);
      expect(funcSpy).toHaveBeenCalledWith(list, num);
      funcSpy.mockRestore();
  });
});
