
// let viewer = Renderer('panorama')
this.viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: "IMG_2785.jpg",
    autoLoad: true,
})

function canvasHandler(fname) {
    this.viewer = pannellum.viewer('panorama', {
    type: 'equirectangular',
    panorama: fname,
    autoLoad: true,
    })
}
