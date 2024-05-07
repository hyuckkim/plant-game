import { getRes } from "../../assets/image";
import { makeGrabbableEquip, makeGrabbableProp } from "./equip";
import { addProps } from "./prop";

export function makeBucket() {
  const justBucket = makeGrabbableEquip(
    getRes("prop_houseprop"),
    [326, 454, 20, 21],
    [0, 3, 30, 30],
    {},
    {
      onWheelUp: () => {
        return waterBucket;
      }
    }
  );
  const waterBucket = makeGrabbableEquip(
    getRes("prop_houseprop"),
    [294, 454, 20, 21],
    [0, 3, 30, 30],
    {},
    {
      onWheelUp: () => {
        return justBucket;
      }
    }
  );
  const bucketProp = makeGrabbableProp(
    getRes("prop_houseprop"),
    [326, 454, 20, 21],
    [210, 180, 30, 30],
    [0, 3, 30, 30],
    {},
    {
      onWheelUp: () => {
        return waterBucket;
      }
    }
  );
  console.log(bucketProp);
  addProps(bucketProp);
}