import React from 'react'
import MediaList from "../MediaList/MediaList";

const SamplePage = () =>
	<div>
		<MediaList title={"Movies"} api={"https://api.myjson.com/bins/1bqcdq"}/>
		<MediaList title={"Other Series"} api={"https://api.myjson.com/bins/18q3ry"}/>
	</div>

export default SamplePage
