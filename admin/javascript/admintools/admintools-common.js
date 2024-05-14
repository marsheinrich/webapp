// Adjusting the page to fit the header, footer, and content
$(document).ready(function() {
    var documentHeight = $(document).height();
    var footerHeight = getContainerHeight('#_Footer') + getContainerSpacing('#_Footer');
    var headerHeight = getContainerHeight('#_Header') + getContainerSpacing('#_Footer');
    var contentSpacing = getContainerSpacing('#_Content');
    var newContentHeight = documentHeight - footerHeight - headerHeight - contentSpacing;

    var contentHeight = getContainerHeight('#_Content');
    if (contentHeight != newContentHeight) {
        $('#_Content').height(newContentHeight);
    }
});

function getContainerSpacing(containerId) {
    var containerSpacing = parseInt($(containerId).css('margin-top'), 10) +
        parseInt($(containerId).css('margin-bottom'), 10) +
        parseInt($(containerId).css('padding-top'), 10) +
        parseInt($(containerId).css('padding-bottom'), 10);
    return containerSpacing;
}

function getContainerHeight(containerId) {
    var containerHeight = $(containerId).outerHeight();
    return containerHeight;
}