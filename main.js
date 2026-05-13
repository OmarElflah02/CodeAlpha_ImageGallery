// SELECTORS
const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const buttons = document.querySelectorAll(".filters button");

// VARIABLES
let currentIndex = 0;
let currentImages = [];

// DISPLAY IMAGES
function displayImages(items) {
	let x = "";
	gallery.innerHTML = "";
	items.forEach((item) => {
		x += `
        <div class="card ${item.category}">
            <img loading="lazy" src="${item.image}" />
        </div>
        `;
	});
	gallery.innerHTML = x;
	addLightboxEvents();
}

// INITIAL DISPLAY
displayImages(galleryData);

// LIGHTBOX EVENTS
function addLightboxEvents() {
	const images = document.querySelectorAll(".card img");
	currentImages = [...images];
	images.forEach((img, index) => {
		img.addEventListener("click", () => {
			currentIndex = index;
			showImage();
			lightbox.classList.add("show");
		});
	});
}

// SHOW IMAGE
function showImage() {
	lightboxImg.src = currentImages[currentIndex].src;
}

// NEXT BUTTON
nextBtn.addEventListener("click", () => {
	currentIndex++;
	if (currentIndex >= currentImages.length) {
		currentIndex = 0;
	}
	showImage();
});

// PREV BUTTON
prevBtn.addEventListener("click", () => {
	currentIndex--;

	if (currentIndex < 0) {
		currentIndex = currentImages.length - 1;
	}
	showImage();
});

// CLOSE LIGHTBOX
closeBtn.addEventListener("click", () => {
	lightbox.classList.remove("show");
});

// CLOSE OUTSIDE
lightbox.addEventListener("click", (e) => {
	if (e.target === lightbox) {
		lightbox.classList.remove("show");
	}
});

// FILTERS
buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector(".filters .active").classList.remove("active");
		btn.classList.add("active");
		const filter = btn.dataset.filter;
		if (filter === "all") {
			displayImages(galleryData);
		} else {
			const filteredData = galleryData.filter((item) => {
				return item.category === filter;
			});
			displayImages(filteredData);
		}
	});
});

// KEYBOARD EVENTS
function handleKeyboard(e) {
	if (!lightbox.classList.contains("show")) return;
	if (e.key === "ArrowRight") nextBtn.click();
	if (e.key === "ArrowLeft") prevBtn.click();
	if (e.key === "Escape") lightbox.classList.remove("show");
}

document.addEventListener("keydown", handleKeyboard);
