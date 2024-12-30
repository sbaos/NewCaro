 <img src="https://github.com/user-attachments/assets/1db0f2c4-37bb-4d38-ae97-2cb0be880b39" alt="Compare" width="400" height="200">
 
## Our test
| #  | Loss function                                      | Explanation                                                                                                                                                      |
|----|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | Stochastic Perceptual Loss A                     | This is the Stochastic Perceptual Loss we proposed in the Methods section with only the first block repeatedly randomized.                                        |
| 2  | Stochastic Perceptual Loss Last Block Only A      | This is the Stochastic Perceptual Loss we proposed in the Methods section with only the first block repeatedly randomized, but only take the last block features as loss (i.e. λ = [0, 0, 0, 1]). |
| 3  | Stochastic Perceptual Loss Last Block Only B      | Same as #1, but with all MaxPool2d layers removed.                                                                                                              |
| 4  | Stochastic Perceptual Loss C                     | Same as #1, but with all the blocks repeatedly randomized.                                                                                                      |
| 5  | Stochastic Perceptual Loss Last Block Only C      | Same as #2, but with all the blocks repeatedly randomized.                                                                                                      |
| 6  | Stochastic Perceptual Loss D                     | Same as #1, but with no randomization (to study the effect of randomization).                                                                                   |
| 7  | Stochastic Perceptual Loss Last Block Only D      | Same as #2, but with no randomization.                                                                                                                           |
| 8  | Pixel loss L2                                    | This is the Pixel loss in the Preliminaries section.                                                                                                            |
| 9  | LPIPS_loss                                       | This is also the metric function to calculate the LPIPS metric.                                                                                                 |
| 10 | 0.8Pixel_loss_L2 + 0.2LPIPS_loss                 | Mixed-Weighted loss of Pixel loss and LPIPS loss.                                                                                                               |
| 11 | PerceptualLoss_VGG16                             | This is the traditional Perceptual loss that takes the pretrained weight VGG16, the high level features are some from layer indexes.                  |
| 12 | 0.8Pixel_loss_L2 + 0.2PerceptualLoss_VGG16       | Mixed-Weighted loss of Pixel loss and Perceptual loss.                                                                              |
##a
<div style="width: 150px; height: 150px; overflow: hidden; position: relative;">
  <img src="https://github.com/user-attachments/assets/2f19b5b1-8481-43fe-87f8-87e8aac5b12b" 
       alt="Cropped Image" 
       style="width: 500px; height: 500px; object-position: left top; display:block ;overflow: visible;">
</div>


<table>
  <tr>
    <!-- First Row: Original Images -->
    <td>
      <img src="https://github.com/user-attachments/assets/2f19b5b1-8481-43fe-87f8-87e8aac5b12b" alt="Image 1" width="150">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/dd635e1d-9248-4e9d-aa5a-69ba940d1cdc" alt="Image 2" width="150">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/39905bd5-79ca-486d-a730-bf3631e78cc4" alt="Image 3" width="150">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/959e8fb6-160a-4268-976a-fdd50d16f297" alt="Image 4" width="150">
    </td>
  </tr>
  <tr>
    <!-- Second Row: Cropped Images -->
    <td>
      <div style="width: 100px; height: 100px; overflow: hidden; position: relative;">
        <img src="https://github.com/user-attachments/assets/2f19b5b1-8481-43fe-87f8-87e8aac5b12b" alt="Cropped 1" style="width: 500px; height: 500px; object-position: center;">
      </div>
    </td>
    <td>
      <div style="width: 150px; height: 150px; overflow: hidden; position: relative;">
        <img src="https://github.com/user-attachments/assets/dd635e1d-9248-4e9d-aa5a-69ba940d1cdc" alt="Cropped 2" style="width: 200px; height: 200px; object-fit: cover; object-position: center;">
      </div>
    </td>
    <td>
      <div style="width: 150px; height: 150px; overflow: hidden; position: relative;">
        <img src="https://github.com/user-attachments/assets/39905bd5-79ca-486d-a730-bf3631e78cc4" alt="Cropped 3" style="width: 200px; height: 200px; object-fit: cover; object-position: center;">
      </div>
    </td>
    <td>
      <div style="width: 150px; height: 150px; overflow: hidden; position: relative;">
        <img src="https://github.com/user-attachments/assets/959e8fb6-160a-4268-976a-fdd50d16f297" alt="Cropped 4" style="width: 200px; height: 200px; object-fit: cover; object-position: center;">
      </div>
    </td>
  </tr>
  <tr>
    <!-- Captions -->
    <td style="text-align: center;"><b>(1 - Ours)</b></td>
    <td style="text-align: center;"><b>(2)</b></td>
    <td style="text-align: center;"><b>(3)</b></td>
    <td style="text-align: center;"><b>(4)</b></td>
  </tr>
</table>


## Our result
| #  | Loss function                                      | PSNR ↑  | SSIM ↑  | LPIPS ↓  |
|----|---------------------------------------------------|---------|---------|----------|
| 1  | Stochastic Perceptual Loss A                     | 29.5394 | 0.8919  | 0.1094   |
| 2  | Stochastic Perceptual Loss Last Block Only A      | 29.1794 | 0.8838  | 0.1061   |
| 3  | Stochastic Perceptual Loss Last Block Only B      | **29.7406** | **0.8944** | 0.1445   |
| 4  | Stochastic Perceptual Loss C                     | 28.8223 | 0.8764  | 0.1123   |
| 5  | Stochastic Perceptual Loss Last Block Only C      | 28.8192 | 0.8738  | 0.1078   |
| 6  | Stochastic Perceptual Loss D                     | 29.0393 | 0.8737  | 0.1451   |
| 7  | Stochastic Perceptual Loss Last Block Only D      | 27.5282 | 0.8029  | 0.1659   |
| 8  | Pixel loss L2                                    | 29.6951 | 0.8915  | 0.1481   |
| 9  | LPIPS_loss                                       | 21.9385 | 0.3964  | 0.0785   |
| 10 | 0.8Pixel_loss_L2 + 0.2LPIPS_loss                 | 28.5336 | 0.8515  | **0.0701**|
| 11 | PerceptualLoss_VGG16                             | 22.5386 | 0.4476  | 0.1008   |
| 12 | 0.8Pixel_loss_L2 + 0.2PerceptualLoss_VGG16       | 29.4032 | 0.8828  | 0.0937   |

