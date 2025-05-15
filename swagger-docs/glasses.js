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
 *               - brand
 *               - price
 *               - description
 *               - frameType
 *               - stock
 *               - color
 *               - material
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the glasses
 *               brand:
 *                 type: string
 *                 description: Brand of the glasses
 *               price:
 *                 type: number
 *                 description: Price of the glasses
 *               description:
 *                 type: string
 *                 description: Description of the glasses
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of glasses images
 *               frameType:
 *                 type: string
 *                 description: Type of frame
 *               stock:
 *                 type: integer
 *                 description: Number of items in stock
 *               color:
 *                 type: string
 *                 description: Color of the glasses
 *               material:
 *                 type: string
 *                 description: Material of the glasses
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Unisex]
 *                 description: Gender the glasses are designed for
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
 *               brand:
 *                 type: string
 *                 description: Brand of the glasses
 *               price:
 *                 type: number
 *                 description: Price of the glasses
 *               description:
 *                 type: string
 *                 description: Description of the glasses
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of glasses images
 *               frameType:
 *                 type: string
 *                 description: Type of frame
 *               stock:
 *                 type: integer
 *                 description: Number of items in stock
 *               color:
 *                 type: string
 *                 description: Color of the glasses
 *               material:
 *                 type: string
 *                 description: Material of the glasses
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Unisex]
 *                 description: Gender the glasses are designed for
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
 *         name: brand
 *         schema:
 *           type: string
 *         description: Brand to filter by
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
 *         name: frameType
 *         schema:
 *           type: string
 *         description: Frame type to filter by
 *       - in: query
 *         name: color
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
 *           enum: [Male, Female, Unisex]
 *         description: Gender to filter by
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