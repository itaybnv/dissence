import networkController from "../networking/NetworkController";
import PacketType from "../misc/PacketType";

class SearchController {
	ByTitle = query =>
		new Promise(resolve => {
			let data = { query: query, amount: 21 };
			let dataBuffer = Buffer.from(JSON.stringify(data));
			networkController
				.send(dataBuffer, PacketType.GET_SEARCH_RESULT)
				.then(res => resolve(JSON.parse(res.data.toString())));
		});
}

const searchController = new SearchController();
export default searchController;
