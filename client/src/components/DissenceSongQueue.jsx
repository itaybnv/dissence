import React, { Component } from "react";

import { List } from "@rmwc/list";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@rmwc/drawer";

export default class DissenceSongQueue extends Component {
  render() {
    return (
      <Drawer>
        <DrawerHeader>
          <DrawerTitle style={{ textAlign: "center" }}>Playlist</DrawerTitle>
        </DrawerHeader>
        <DrawerContent>
          <List></List>
        </DrawerContent>
      </Drawer>
    );
  }
}
