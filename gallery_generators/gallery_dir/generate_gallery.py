import os
import shutil
from PIL import Image
import codecs

# html template for whole page
template = '''
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Základní škola a Mateřská škola, Moravský písek</title>
    <link rel="icon" type="image/x-icon" href="/data/images/icons/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.2/photoswipe.min.css" integrity="sha512-LFWtdAXHQuwUGH9cImO9blA3a3GfQNkpF2uRlhaOpSbDevNyK1rmAjs13mtpjvWyi+flP7zYWboqY+8Mkd42xA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="/data/styles/styles.css" rel="stylesheet">
</head>
<body>
<div class="page-background"></div>
<div id="header"></div>
<main>
    <div class="gallery-navigation">
        <div class="gallery-navigation__back-arrow" onclick="history.back()">
            <img src="/data/images/icons/arrow-left.svg" alt="šipka zpět" class="gallery-navigation__icon"/>
        </div>
        <div class="gallery-navigation__layout-switch">
            <img src="/data/images/icons/view-grid-4.svg" alt="změna rozložení" class="gallery-navigation__icon" onclick="setGalleryLayout('4')"/>
            <img src="/data/images/icons/view-grid-9.svg" alt="změna rozložení" class="gallery-navigation__icon" onclick="setGalleryLayout('9')"/>
        </div>
    </div>
    <div class="body gallery-body">
        <div class="article">
            <hr class="article__line"/>
            <div class="article__section">
                <h1>{header}</h1>
                <div class="article__body gallery gallery--loading" id="gallery">
{images}
                </div>
            </div>
        </div>
    </div>
</main>
<div id="footer"></div>

<script src=" https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js "></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
<script>const selectedTab = "#fotoVideo"</script>
<script id="script" src="/data/scripts/index.js"></script>
<script type="module" src="/data/scripts/gallery.js"></script>
</body>
</html>
'''

# template for each found photo
template_image = '''
                    <a class="gallery__image-wrapper" href="{full_image_path}"
                       data-pswp-width="{full_image_width}"
                       data-pswp-height="{full_image_height}"
                       target="_blank">
                        <img class="gallery__image" src="{thumbnail_image_path}" alt="" />
                    </a>
'''


def get_image_list():
    """
    reads current directory content and filter only images from which I want to generate library

    :return: array of found image names within current directory
    """

    pwd = os.getcwd()
    dir_items = os.listdir(pwd)
    found_images = []

    for item in dir_items:
        # filter out thumbnails
        if (item.startswith('thn')):
            continue

        # filter out items which are not images
        if (item.endswith('.png') or item.endswith('.jpg') or item.endswith('.jpeg')):
            found_images.append(item)

    return found_images


def delete_gallery():
    """
    removes existing gallery files with thumbnail

    :return: null
    """

    if (os.path.isdir('thumbnails')):
        shutil.rmtree('thumbnails')

    if os.path.isfile('galerie.html'):
        os.remove('galerie.html')

    return


def generate_thumbnails(images):
    """
    generates thumbnail in subdirectory ./thumbnails using found images from current directory

    :param images: array of image names
    :return: array of object that contains info about original images [{name: , width: , height: }]
    """
    images_with_params = []

    os.makedirs('./thumbnails')

    for image_name in images:
        image = Image.open(image_name)
        width, height = image.size

        # transform smaller side resolution to bigger side resolution
        smaller_side = min(width, height)
        bigger_side = max(width, height)
        desired_min_resolution = int((256/smaller_side)*bigger_side)

        image.thumbnail((desired_min_resolution, desired_min_resolution))
        image.save("./thumbnails/{0}".format(image_name))
        image.close()
        images_with_params.append({
            "name": image_name,
            "width": width,
            "height": height
        })

    return images_with_params


def get_current_dir_name():
    """
    Reads and returns current directory name.

    :return: name of current directory
    """
    current_directory = os.getcwd()
    directory_name = os.path.basename(current_directory)

    return directory_name


def generate_gallery(images_with_params, header):
    """
    generates 'galerie.html' using found images and given header name

    :param images_with_params: array of found image names within current dir
    :param header: given header name for current gallery
    :return: null
    """
    directory_name = get_current_dir_name()

    image_tags = []

    for image in images_with_params:
        image_tags.append(template_image.format(
            full_image_path="/galerie/{0}/{1}".format(directory_name, image["name"]),
            full_image_width=image["width"],
            full_image_height=image["height"],
            thumbnail_image_path="/galerie/{0}/thumbnails/{1}".format(directory_name, image["name"])
        ))

    # write out html to output file
    gallery_file = codecs.open("galerie.html", "w", "utf-8")
    gallery_file.write(template.format(
        header=header,
        images=(''.join(image_tags))
    ))
    gallery_file.close()

    return


def print_link_tag(header):
    """
    prints out image tag for insert into existing html page

    :param header:
    :return: null
    """

    directory_name = get_current_dir_name()

    print("""
    Tag pro vložení galerie:
    
    <li><a href="/galerie/{0}/galerie.html">{1}</a></li>
    """.format(directory_name, header))

    return


def main():
    # first get images from current dir
    images = get_image_list()
    images.sort()

    # show user found photos
    print('Nalezené fotografie:')
    for image in images:
        print(image)
    print('\nCelkem nalezeno: {0}\n'.format(len(images)))

    # get header content and confirmation from user
    header = input("Zadejte nadpis galerie [Enter]: ")
    confirm = input("Generovat galerii? [y]: ")
    if (confirm != 'y' and confirm != "Y"):
        print('Zrušeno!')
        return

    # delete already existing gallery (if exist)
    print('Mažu existující galerii.')
    delete_gallery()

    # generate new gallery
    print('Generuji náhledové miniatury.')
    images_with_params = generate_thumbnails(images)
    print('Generuji galerii.')
    generate_gallery(images_with_params, header)

    # print tag for inserting gallery into existing html
    print_link_tag(header)

    input("Dokončeno [Enter]")


if __name__ == '__main__':
    main()
