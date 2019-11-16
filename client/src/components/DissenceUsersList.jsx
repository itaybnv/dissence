import React, { Component } from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";
import { List } from "@rmwc/list";

export default class DissenceUsersList extends Component {
  render() {
    return (
      <Drawer className="dissence-users-list-drawer" dir="rtl">
        <DrawerHeader>
          <DrawerTitle style={{ textAlign: "center" }}>
            Currently listening
          </DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List></List>
        </DrawerContent>
      </Drawer>
    );
  }
}
