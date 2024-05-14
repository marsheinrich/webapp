var __Default_EZSlider_Config__ = '{"container":{"id":"landing-slider-id","class":"ezslider-container"},"images":{"class":"ezslider-image-class","imageinfo":[{"id":"1","src":"https://ezclocker.com/public/images/slider-placeholder.png","title":"Image 1","link":"http://ezclocker.com/links/image1link.html"},{"id":"2","src":"https://ezclocker.com/public/images/slider-placeholder.png","title":"Image 1","link":"http://ezclocker.com/links/image1link.html"}]},"navigation":{"navdots":{"class":"ezslider-nav-dots","icon":"http://ezclocker.com/images/navdot.png"},"leftbutton":{"class":"ezslider-nav-button","icon":"http://ezclocker.com/images/lefticon.png","text":"<"},"rightbutton":{"class":"ezslider-nav-button","icon":"http://ezclocker.com/images/righticon.png","text":"<"}},"autoslide":{"delayms":"4000","jqtransition":"jquery-transition-name","startingimageid":"1"}}';

/**
 * Creates a new JSON object to use when configuring
 * the slider.
 * @returns
 */
function createDefaultConfiguration() {
    var newConfig = JSON.parse(_DEFAULT_EZSlider_Config__);
    return newConfig;
}

/**
 * Configures the slider.
 * Use the createDefaultConfiguration to create a configuration object,
 * set your preferences, and pass into this function.
 * @param configuration
 */
function configureSlider(container, configuration) {
    if (configuration === null) {
        return;
    } // nothing to configure

    // Container
    var sliderId = (configuration.container.id === null ? '' : configuration.container.id);
    var html = '<div id="_ezslider_' + sliderId + '">';
    if (configuration.container !== null) {
        var containerClass = (configuration.container.classname === null ? '' : configuration.container.classname);
        var containerId = (configuration.container.id === null ? '_ezslider-container_' : '_ezslider-container_' +
    configuration.container.id);
        html = '<div class="' + containerClass + '" id="' + containerId + '">';
    }
    html += '<input id="' + createCurrentImageIndexId(sliderId) + '" type="hidden" value="-1"/>';

    // Left navigation Button
    if (configuration.navigation !== null && configuration.navigation.leftbutton !== null) {
        var leftNavClass = (configuration.navigation.leftbutton.classname === null ? '' : configuration.navigation.leftbutton
            .classname);
        var leftIcon = (configuration.navigation.leftbutton.icon === null ? '' : configuration.navigation.leftbutton.icon);
        var leftText = (configuration.navigation.leftbutton.text === null ? '<' : configuration.navigation.leftbutton.text);
        html += '<div id="_ezslider_left_nav_' + sliderId + '" class="' + leftNavClass + '" ' +
      'onclick="swapImages(getCurrentImage(' + sliderId + '), getPreviousImage(' + sliderId + '))">' + leftIcon +
      ' ' + leftText + '</div>';
    }

    var navDots = '';

    // Images
    if (configuration.images !== null) {
        var imageClass = (configuration.images.classname === null ? '' : configuration.images.classname);
        html += '<input id="' + createTotalImageCountId(sliderId) + '" type="hidden" value="' + configuration.images.imageinfo
            .length - 1 + '"/>';
        for (var imageIndex = 0; imageIndex < configuration.images.imageinfo.length; imageIndex++) {
            var imageInfo = configuration.images.imageinfo[imageIndex];
            if (imageInfo === null) {
                continue;
            } // no image data, move on
            if (imageInfo.src === null) {
                continue;
            } // no image, move on

            // Data from imageInfo, or default values
            var imageId = createImageId(imageIndex, sliderId);
            var imageSrc = imageInfo.src;
            var imageTitle = (imageInfo.title === null ? '' : (imageInfo.title.value === null ? '' : imageInfo.title.value));

            // Image Tag
            html += '<div hidden id="' + imageId + '_container">';
            var img = '<img id="' + imageId + '" class="' + imageClass + '" src="' + imageSrc + '" alt="' + imageTitle +
        '"/>';

            // Link Tag on Image
            if (imageInfo.link !== null) {
                img = '<a href="' + imageInfo.link + '" id="' + imageId + '_link">' + img + '</a>';
            }

            // Title Div (title does not have a link)
            if (imageInfo.title !== null) {
                img = '<div id="' + imageId + '_title" class="' + imageTitleClass + '">' + imageTitle + '</div>' + img;
            }
            html += img + '</div>'; // append image

            // Navigation Dots (one per image)
            if (configuration.navigation !== null && configuration.navigation.navdots !== null) {
                var navDotsClass = (configuration.navigation.navdots.classname === null ? '' : configuration.navigation
                    .navdots.classname);
                var navDotId = '_navdot_' + imageId + '_' + sliderId;
                var navDot = '<div class="' + navDotsClass + '" id="' + navDotId +
          '" onclick="swapImages(getCurrentImage(' + sliderId + '), getImage(' + sliderId + ',' + imageIndex +
          '))">';
                if (configuration.navigation.navdots.image !== null) {
                    navDot += '<img src="' + configuration.navigation.navdots.image + '"/>';
                }
                navDot += '</div>';
                navDots += navDot;
            }

        }
    }

    // Right navigation Button
    if (configuration.navigation !== null && configuration.navigation.rightbutton !== null) {
        var rightNavClass = (configuration.navigation.rightbutton.classname === null ? '' : configuration.navigation.rightbutton
            .classname);
        var rightIcon = (configuration.navigation.rightbutton.icon === null ? '' : configuration.navigation.rightbutton
            .icon);
        var rightText = (configuration.navigation.rightbutton.text === null ? '<' : configuration.navigation.rightbutton
            .text);
        html += '<div class="' + rightNavClass + '" onclick="swapImages(getCurrentImage(' + sliderId +
      '), getNextImage(' + sliderId + '))">' + rightIcon + ' ' + rightText + '</div>';
    }

    html += '</div>'; // closed image container

    $(container).html(html);
}

/**
 * Swaps the visibility of images
 * @param current
 * @param newImage
 */
function swapImages(current, newImage) {
    if (current !== null) {
        current.css('hidden', true);
    }
    if (newImage !== null) {
        newImage.css('hidden', false);
    }
}

/**
 * Returns the previous image from the current one.
 * If there is not a previous image, code will scan and jump to the last
 * Returns null if no images are available and sets current image index
 * image.
 * @returns
 */
function getPreviousImage(sliderId) {
    var currentImageIndexId = createCurrentImageIndexId(sliderId);
    var currentImageIndex = $('#' + currentImageIndexId).val();
    currentImageIndex--;
    var previousImage = getImage(sliderId, currentImageIndex);
    if (previousImage === null) {
        currentImageIndex = $('#' + createTotalImageCountId(sliderId)).val();
        previousImage = getImage(sliderId, currentImageIndex);
    }
    if (previousImage === null) {
        currentImageIndex = -1;
    } // no images
    $('#' + currentImageIndexId).val(currentImageIndex); // no images
    return previousImage;
}

/**
 * Returns the next image available, or null
 * Sets current image index to new index OR -1 if no images available
 * @param id
 * @returns
 */
function getNextImage(sliderId) {
    var currentImageIndexId = createCurrentImageIndexId(sliderId);
    var currentImageIndex = $('#' + currentImageIndexId).val();
    currentImageIndex++;
    var nextImage = getImage(sliderId, currentImageIndex);
    if (nextImage === null) {
        currentImageIndex = 0;
        nextImage = getImage(sliderId, currentImageIndex); // Jump to front
    }
    if (nextImage === null) {
        currentImageIndex = -1;
    } // no images, set current to -1
    $('#' + currentImageIndexId).val(currentImageIndex);
    return nextImage;
}

/**
 * Returns an image by index.
 * Can return null if the image doesn't exist.
 * @param id
 * @param index
 * @returns
 */
function getImage(sliderId, imageIndex) {
    var image = $('#' + createImageId(sliderId, imageIndex));
    return image;
}

/**
 * Creates an image id from a slider ID and image index
 * @param sliderId
 * @param imageIndex
 * @returns {String}
 */
function createImageId(sliderId, imageIndex) {
    return '_ezslider_image_' + imageIndex + '_' + sliderId;
}

/**
 * Creates the id for the current image index hidden input field
 * @param sliderId
 * @returns {String}
 */
function createCurrentImageIndexId(sliderId) {
    return '_ezslider-current-image-index_' + sliderId + '_';
}

/**
 * Returns the id of the total image hidden input field for the slider
 * @param sliderId
 * @returns
 */
function createTotalImageCountId(sliderId) {
    return '_ezslider-image-count_' + id + '_';
}

/**
 * Starts the image slider's auto slide
 * ability
 * @param sliderId
 */
function startSlider(sliderId) {
    swapImages(null, getImage(sliderId, 0));
//TODO: kick off timer
}

/**
 * Stops the image slider from auto sliding images
 * @param sliderId
 */
function stopSlider(sliderId) {
    //TODO: stop timer
}
