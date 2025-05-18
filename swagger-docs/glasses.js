/**
 * @swagger
 * /facefit/glasses/add:
 *   post:
 *     summary: Add a new glasses item (admin only)
 *     tags: [Glasses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *               - images
 *               - shape
 *               - weight
 *               - size
 *               - material
 *               - type
 *               - gender
 *               - colors
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the glasses
 *               price:
 *                 type: number
 *                 description: Price of the glasses
 *               stock:
 *                 type: integer
 *                 description: Number of items in stock
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of glasses images
 *               shape:
 *                 type: string
 *                 description: Shape of the glasses
 *               weight:
 *                 type: number
 *                 description: Weight of the glasses
 *               size:
 *                 type: string
 *                 description: Size of the glasses
 *               material:
 *                 type: string
 *                 description: Material of the glasses
 *               type:
 *                 type: string
 *                 enum: [sunglasses, eyeglasses]
 *                 description: Type of glasses
 *               gender:
 *                 type: string
 *                 enum: [Men, Women]
 *                 description: Gender the glasses are designed for
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Available colors for the glasses
 *               tryOn:
 *                 type: boolean
 *                 description: Whether the glasses can be tried on virtually
 *               arModels:
 *                 type: object
 *                 properties:
 *                   modelArmsOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the arms model
 *                   modelArmsMTL:
 *                     type: string
 *                     description: URL to the MTL file for the arms model
 *                   modelLensesOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the lenses model
 *                   modelLensesMTL:
 *                     type: string
 *                     description: URL to the MTL file for the lenses model
 *                   modelFrameOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the frame model
 *                   modelFrameMTL:
 *                     type: string
 *                     description: URL to the MTL file for the frame model
 *                   modelArmsMaterial:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Materials for the arms model
 *                   modelFrameMaterial:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Materials for the frame model
 *     responses:
 *       201:
 *         description: Glasses added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Glasses'
 *       401:
 *         description: Unauthorized - Not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /facefit/glasses/update/{id}:
 *   put:
 *     summary: Update a glasses item (admin only)
 *     tags: [Glasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the glasses to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the glasses
 *               price:
 *                 type: number
 *                 description: Price of the glasses
 *               stock:
 *                 type: integer
 *                 description: Number of items in stock
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of glasses images
 *               shape:
 *                 type: string
 *                 description: Shape of the glasses
 *               weight:
 *                 type: number
 *                 description: Weight of the glasses
 *               size:
 *                 type: string
 *                 description: Size of the glasses
 *               material:
 *                 type: string
 *                 description: Material of the glasses
 *               type:
 *                 type: string
 *                 enum: [sunglasses, eyeglasses]
 *                 description: Type of glasses
 *               gender:
 *                 type: string
 *                 enum: [Men, Women]
 *                 description: Gender the glasses are designed for
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Available colors for the glasses
 *               tryOn:
 *                 type: boolean
 *                 description: Whether the glasses can be tried on virtually
 *               arModels:
 *                 type: object
 *                 properties:
 *                   modelArmsOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the arms model
 *                   modelArmsMTL:
 *                     type: string
 *                     description: URL to the MTL file for the arms model
 *                   modelLensesOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the lenses model
 *                   modelLensesMTL:
 *                     type: string
 *                     description: URL to the MTL file for the lenses model
 *                   modelFrameOBJ:
 *                     type: string
 *                     description: URL to the OBJ file for the frame model
 *                   modelFrameMTL:
 *                     type: string
 *                     description: URL to the MTL file for the frame model
 *                   modelArmsMaterial:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Materials for the arms model
 *                   modelFrameMaterial:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Materials for the frame model
 *     responses:
 *       200:
 *         description: Glasses updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Glasses'
 *       401:
 *         description: Unauthorized - Not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Glasses not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /facefit/glasses/delete/{id}:
 *   delete:
 *     summary: Delete a glasses item (admin only)
 *     tags: [Glasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the glasses to delete
 *     responses:
 *       200:
 *         description: Glasses deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Glasses deleted successfully
 *       401:
 *         description: Unauthorized - Not an admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Glasses not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /facefit/glasses/search:
 *   get:
 *     summary: Search for glasses
 *     tags: [Glasses]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name to search for
 *       - in: query
 *         name: shape
 *         schema:
 *           type: string
 *         description: Shape to filter by
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [sunglasses, eyeglasses]
 *         description: Type to filter by
 *       - in: query
 *         name: colors
 *         schema:
 *           type: string
 *         description: Color to filter by
 *       - in: query
 *         name: material
 *         schema:
 *           type: string
 *         description: Material to filter by
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [Men, Women]
 *         description: Gender to filter by
 *       - in: query
 *         name: tryOn
 *         schema:
 *           type: boolean
 *         description: Filter by try-on capability
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Glasses'
 *
 * /facefit/glasses/all:
 *   get:
 *     summary: Get all glasses
 *     tags: [Glasses]
 *     responses:
 *       200:
 *         description: List of all glasses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Glasses'
 *
 * /facefit/glasses/bestsellers:
 *   get:
 *     summary: Get bestselling glasses
 *     tags: [Glasses]
 *     responses:
 *       200:
 *         description: List of bestselling glasses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Glasses'
 *
 * /facefit/glasses/newarrivals:
 *   get:
 *     summary: Get new arrivals
 *     tags: [Glasses]
 *     responses:
 *       200:
 *         description: List of new arrival glasses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Glasses'
 */ 