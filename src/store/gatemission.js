import { observable } from "mobx";
import { createContext } from "react";

// 게이트미션 (mobx)
const gatemission = () => {
  const normalData = {
    number: 0,
    title: "",
    averagePeriod: 0,
    condition: "",
    detail: "",
    help: "",
    okType: 1,
    GateRewards: [],
    GateVideos: [],
    SelectionLists: []
  };

  let data = observable(normalData);

  return { data, normalData };
};

export const GateMissionContext = createContext(gatemission());
