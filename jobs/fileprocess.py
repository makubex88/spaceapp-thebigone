
import rasterio
import matplotlib.pyplot as plt

# Path to your Sentinel GeoTIFF (.tiff)
file_path = "HLS.S30.T51PUS.2025056T021609.v2.0.B06.tif"

# Open the raster
with rasterio.open(file_path) as src:
    print("CRS:", src.crs)            # coordinate reference system
    print("Bounds:", src.bounds)      # extent
    print("Bands:", src.count)        # number of bands
    print("Width x Height:", src.width, "x", src.height)
    
    # Read the first band
    band1 = src.read(1)

# Plot the band
plt.imshow(band1, cmap="gray")
plt.colorbar(label="Pixel values")
plt.title("Sentinel TIFF - Band 1")
plt.show()