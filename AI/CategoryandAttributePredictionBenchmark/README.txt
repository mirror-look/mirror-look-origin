=====================================================================
Large-scale Fashion Recognition and Retrieval (DeepFashion) Dataset
=====================================================================

=============================================
Category and Attribute Prediction Benchmark
=============================================

--------------------------------------------------------
By Multimedia Lab, The Chinese University of Hong Kong
--------------------------------------------------------

For more information about the dataset, visit the project website:

  http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion.html

If you use the dataset in a publication, please cite the papers below:

  @inproceedings{liu2016deepfashion,
 	author = {Ziwei Liu, Ping Luo, Shi Qiu, Xiaogang Wang, and Xiaoou Tang},
 	title = {DeepFashion: Powering Robust Clothes Recognition and Retrieval with Rich Annotations},
 	booktitle = {Proceedings of IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
 	month = June,
 	year = {2016}
  }

Please note that we do not own the copyrights to these images. Their use is RESTRICTED to non-commercial research and educational purposes.



========================
Change Log
========================

Version 1.0, released on 08/08/2016
Version 1.1, released on 22/12/2016, add landmarks annotations



========================
File Information
========================

- Images (Img/img.zip)
    289,222 diverse clothes images. See IMAGE section below for more info.

- Bounding Box Annotations (Anno/list_bbox.txt)
    bounding box labels. See BBOX LABELS section below for more info.

- Fashion Landmark Annotations (Anno/list_landmarks.txt)
	fashion landmark labels. See LANDMARK LABELS section below for more info.

- Category Annotations (Anno/list_category_cloth.txt & Anno/list_category_img.txt)
	clothing category labels. See CATEGORY LABELS section below for more info.

- Attribute Annotations (Anno/list_attr_cloth.txt & Anno/list_attr_img.txt)
	clothing attribute labels. See ATTRIBUTE LABELS section below for more info.

- Evaluation Partitions (Eval/list_eval_partition.txt)
	image names for training, validation and testing set respectively. See EVALUATION PARTITIONS section below for more info.



=========================
IMAGE
=========================

------------ img.zip ------------

format: JPG

---------------------------------------------------

Notes:
1. The long side of images are resized to 300;
2. The aspect ratios of original images are kept unchanged.

---------------------------------------------------



=========================
BBOX LABELS
=========================

------------ list_bbox.txt ------------

First Row: number of images
Second Row: entry names

Rest of the Rows: <image name> <bbox location>

---------------------------------------------------

Notes:
1. The order of bbox labels accords with the order of entry names;
2. In bbox location, "x_1" and "y_1" represent the upper left point coordinate of bounding box, "x_2" and "y_2" represent the lower right point coordinate of bounding box. Bounding box locations are listed in the order of [x_1, y_1, x_2, y_2].

---------------------------------------------------



=========================
LANDMARK LABELS
=========================

------------ list_landmarks.txt ------------

First Row: number of images
Second Row: entry names

Rest of the Rows: <image name> <clothes type> <variation type> [<landmark visibility 1> <landmark location x_1> <landmark location y_1>, ... <landmark visibility 8> <landmark location x_8> <landmark location y_8>]

---------------------------------------------------

Notes:
1. The order of landmark labels accords with the order of entry names;
2. In clothes type, "1" represents upper-body clothes, "2" represents lower-body clothes, "3" represents full-body clothes. Upper-body clothes possess six fahsion landmarks, lower-body clothes possess four fashion landmarks, full-body clothes possess eight fashion landmarks;
3. In variation type, "1" represents normal pose, "2" represents medium pose, "3" represents large pose, "4" represents medium zoom-in, "5" represents large zoom-in;
4. In landmark visibility state, "0" represents visible, "1" represents invisible/occluded, "2" represents truncated/cut-off;
5. For upper-body clothes, landmark annotations are listed in the order of ["left collar", "right collar", "left sleeve", "right sleeve", "left hem", "right hem"]; For lower-body clothes, landmark annotations are listed in the order of ["left waistline", "right waistline", "left hem", "right hem"]; For upper-body clothes, landmark annotations are listed in the order of ["left collar", "right collar", "left sleeve", "right sleeve", "left waistline", "right waistline", "left hem", "right hem"].

---------------------------------------------------



=========================
CATEGORY LABELS
=========================

--------------- list_category_cloth.txt --------------

First Row: number of categories
Second Row: entry names

Rest of the Rows: <category name> <category type>

--------------- list_category_img.txt --------------

First Row: number of images
Second Row: entry names

Rest of the Rows: <image name> <category label>

---------------------------------------------------

Notes:
1. In category type, "1" represents upper-body clothes, "2" represents lower-body clothes, "3" represents full-body clothes;
2. The order of category labels accords with the order of category names;
3. In category labels, the number represents the category id in category names;
4. For the clothing categories, "Cape", "Nightdress", "Shirtdress" and "Sundress" have been merged into "Dress";
5. Category prediction is treated as a 1-of-K classification problem.

---------------------------------------------------



=========================
ATTRIBUTE LABELS
=========================

--------------- list_attr_cloth.txt --------------

First Row: number of attributes
Second Row: entry names

Rest of the Rows: <attribute name> <attribute type>

--------------- list_attr_img.txt --------------

First Row: number of images
Second Row: entry names

Rest of the Rows: <image name> <attribute labels>

---------------------------------------------------

Notes:
1. In attribute type, "1" represents texture-related attributes, "2" represents fabric-related attributes, "3" represents shape-related attributes, "4" represents part-related attributes, "5" represents style-related attributes;
2. The order of attribute labels accords with the order of attribute names;
3. In attribute labels, "1" represents positive while "-1" represents negative, '0' represents unknown;
4. Attribute prediction is treated as a multi-label tagging problem.

---------------------------------------------------



=========================
EVALUATION PARTITIONS
=========================

------------- list_eval_partition.txt -------------

First Row: number of images
Second Row: entry names

Rest of the Rows: <image name> <evaluation status>

---------------------------------------------------

Notes:
1. In evaluation status, "train" represents training image, "val" represents validation image, "test" represents testing image;
2. Please refer to the paper "DeepFashion: Powering Robust Clothes Recognition and Retrieval with Rich Annotations" for more details.

---------------------------------------------------



=========================
Contact
=========================

Please contact Ziwei Liu (lz013@ie.cuhk.edu.hk) for questions about the dataset.
