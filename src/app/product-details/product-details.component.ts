import { Component, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';

@Component({
    selector: 'app-product-details',
    standalone: false,
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent {
    constructor(private route: ActivatedRoute, private productService: ProductService) { }

    selectedProduct: Product;
    selectedColorway: string = ""; // From the colorParam in the Url
    selectedCwImgs: string[]; // Cw = colorway, Imgs = Images
    selectedIndex: number = 0;

    // defaultImage: string = ""; substituted with currentDisplayImage
    defaultColorway: string = "nero";

    currentDisplayImage: string = ""; // The image shown in "contenitore-immagine-scarpa" (big image)

    ngOnInit(): void {
        console.log("selectedIndex=" + this.selectedIndex);
        // substituted the snapshot with the subscribe method of 'paramMap'
        this.route.paramMap.subscribe(params => {
            const nameParam = params.get('slug');
            const colorParam = params.get('color');

            if (nameParam) {
                this.productService.getProductBySlug(nameParam).subscribe({
                    next: (product) => {
                        this.selectedProduct = product; // In order to get the selected product
                        this.selectedColorway = colorParam || this.defaultColorway; // If there isn't the colorParam, it assigns the defaultColorway

                        // It loads the images of the selected colorway in 'selectedCwImgs'
                        this.selectedCwImgs = this.selectedProduct.immagine[this.selectedColorway] as string[];

                        // The first image of 'selectedCwImgs' is put in 'currentDisplayImage'
                        this.currentDisplayImage = this.selectedCwImgs[0];
                    }
                });
            }
        });
    }

    // showShoeSize(): void {
    //     console.log("currentDisplayImage= " + this.currentDisplayImage);
    //     console.log("Immagini: ", this.selectedCwImgs);
    //     let activeIndex = this.selectedCwImgs.indexOf(this.currentDisplayImage);
    //     // console.log(this.selectedCwImgs.indexOf(currentImage));
    //     console.log("activeIndex=", activeIndex)

    //     if (activeIndex >= this.selectedCwImgs.length - 1) {
    //         activeIndex = 0;
    //         this.currentDisplayImage = this.selectedCwImgs[activeIndex];
    //     } else
    //         this.currentDisplayImage = this.selectedCwImgs[activeIndex + 1];

    //     console.log("currentDisplayImage=", this.currentDisplayImage);
    // }

    // Flag to check whether the page header is sticky or not
    isImageGallerySticky: boolean = false;

    // Page header will be sticky after 100px
    readonly triggerPoint: number = 100;

    // @HostListener it monitors the scroll event of the window
    @HostListener('window:scroll')
    onScroll() {
        // It updates the flag based on the position every scroll
        this.isImageGallerySticky = window.scrollY > this.triggerPoint;
    }

    // Method used to show the image in the main container of the hovered thumbnail
    selectThumbnailImage(nuovoSrc: string, x: number) {
        // If the image is the one dispalyed, then do nothing
        if (this.currentDisplayImage === nuovoSrc) return;
        this.currentDisplayImage = nuovoSrc; // to update the current image with the one hovered
        this.selectedIndex = x;
    }

    // Methods used for the thumbnail slider
    goToNextImg(): void {
        this.selectedIndex++;
        if (this.selectedIndex > this.selectedCwImgs.length - 1) {
            this.selectedIndex = 0;
        }

        this.currentDisplayImage = this.selectedCwImgs[this.selectedIndex];

        // console.log("selectedIndex=" + this.selectedIndex);
    }

    goToPreviousImg(): void {
        this.selectedIndex--;
        if (this.selectedIndex < 0) {
            this.selectedIndex = this.selectedCwImgs.length - 1;
        }

        this.currentDisplayImage = this.selectedCwImgs[this.selectedIndex];

        // console.log("selectedIndex=" + this.selectedIndex);
    }

    // Method get the slug with the dashes instead of the spaces
    getProductSlug(name: string): string {
        return this.productService.convertSpaceToDash(name).toLowerCase();
    }
}
