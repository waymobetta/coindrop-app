const emojiList = [
	"https://user-images.githubusercontent.com/17755587/51215590-3d2df200-18d6-11e9-8d34-c712af2e1a97.png",
	"https://user-images.githubusercontent.com/17755587/51215626-63539200-18d6-11e9-9533-f1d3804f2c4d.png",
	"https://user-images.githubusercontent.com/17755587/51215647-76666200-18d6-11e9-8bbb-4d4eb3c903e9.png",
	"https://user-images.githubusercontent.com/17755587/51215654-7ebe9d00-18d6-11e9-842d-88027ea68115.png",
	"https://user-images.githubusercontent.com/17755587/51215665-867e4180-18d6-11e9-9157-25c4c0ede8ea.png",
	"https://user-images.githubusercontent.com/17755587/51215671-91d16d00-18d6-11e9-945f-2598e23e5f95.png",
	"https://user-images.githubusercontent.com/17755587/51215678-98f87b00-18d6-11e9-96ae-a10b6c44646c.png",
	"https://user-images.githubusercontent.com/17755587/51215688-a150b600-18d6-11e9-89e2-25b7e9df8e6b.png",
	"https://user-images.githubusercontent.com/17755587/51215702-a7df2d80-18d6-11e9-9979-fb05557210ba.png",
	"https://user-images.githubusercontent.com/17755587/51215720-ae6da500-18d6-11e9-8985-6921c4ce0b94.png",
	"https://user-images.githubusercontent.com/17755587/51215724-b4fc1c80-18d6-11e9-8833-c96dec4b83f1.png",
	"https://user-images.githubusercontent.com/17755587/51215739-baf1fd80-18d6-11e9-8a4e-0a1f215e339e.png",
	"https://user-images.githubusercontent.com/17755587/51215746-c0e7de80-18d6-11e9-93b9-969df7e14a20.png",
	"https://user-images.githubusercontent.com/17755587/51215753-c6452900-18d6-11e9-894e-34c0e2a55ed2.png",
	"https://user-images.githubusercontent.com/17755587/51215762-cc3b0a00-18d6-11e9-82e4-2190273ff0b9.png",
	"https://user-images.githubusercontent.com/17755587/51215771-d230eb00-18d6-11e9-9620-a162b060cc6e.png",
	"https://user-images.githubusercontent.com/17755587/51215775-d826cc00-18d6-11e9-8b03-cc34a67fb781.png",
	"https://user-images.githubusercontent.com/17755587/51215782-dd841680-18d6-11e9-8871-1d6b88e864df.png",
	"https://user-images.githubusercontent.com/17755587/51215787-e248ca80-18d6-11e9-89ae-69eaafe703c7.png",
	"https://user-images.githubusercontent.com/17755587/51215793-e8d74200-18d6-11e9-955d-16fbaf83aee9.png",
	"https://user-images.githubusercontent.com/17755587/51215800-eecd2300-18d6-11e9-8d6a-afcd03d95f98.png",
	"https://user-images.githubusercontent.com/17755587/51215804-f55b9a80-18d6-11e9-8a6b-25e68d2d0958.png",
	"https://user-images.githubusercontent.com/17755587/51215812-fc82a880-18d6-11e9-9f1f-02898e2dc22b.png"
]

const Emoji = {
	fetchRandomEmoji() {
		const rand = Math.floor(Math.random() * emojiList.length);
		return emojiList[rand];
	}	
}

export default Emoji;
