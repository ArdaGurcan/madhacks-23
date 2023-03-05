let images = new Array();
images.push("https://pannellum.org/images/cerro-toco-0.jpg")
images.push("https://pannellum.org/images/alma.jpg")
images.push("https://pannellum.org/images/jfk.jpg")
images.push("https://i.imgur.com/G7t9QD9.jpg")

// let viewer = Renderer('panorama')
this.viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: images[0],
    autoLoad: true,
})

function canvasHandler(index) {
    console.log(index);

    this.viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: images[index % images.length],
    autoLoad: true,
    })
}
