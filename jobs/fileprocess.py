import rasterio
from rasterio.plot import show
import matplotlib.pyplot as plt

# Path to Sentinel .tiff file
tiff_path = "data/S2A_MSIL2A_20250701T032559_B04.tiff"

# Open the GeoTIFF file
with rasterio.open(tiff_path) as src:
    print("Driver:", src.driver)
    print("CRS:", src.crs)
    print("Width, Height:", src.width, src.height)
    print("Bands:", src.count)

    # Read first band
    band1 = src.read(1)
    print("Shape:", band1.shape)

    # Plot
    plt.imshow(band1, cmap="gray")
    plt.title("Sentinel Band 4")
    plt.colorbar(label="Reflectance")
    plt.show()
