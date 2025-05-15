/**
 * @swagger
 * /facefit/prescriptions:
 *   post:
 *     summary: Create a new prescription
 *     tags: [Prescriptions]
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
 *               - rightEye
 *               - leftEye
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the prescription
 *               rightEye:
 *                 type: object
 *                 properties:
 *                   sphere:
 *                     type: number
 *                     description: Sphere value for right eye
 *                   cylinder:
 *                     type: number
 *                     description: Cylinder value for right eye
 *                   axis:
 *                     type: number
 *                     description: Axis value for right eye
 *               leftEye:
 *                 type: object
 *                 properties:
 *                   sphere:
 *                     type: number
 *                     description: Sphere value for left eye
 *                   cylinder:
 *                     type: number
 *                     description: Cylinder value for left eye
 *                   axis:
 *                     type: number
 *                     description: Axis value for left eye
 *               pdDistance:
 *                 type: number
 *                 description: Pupillary distance
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Prescription'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /facefit/prescriptions/{prescriptionId}:
 *   get:
 *     summary: Get a specific prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: prescriptionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the prescription to retrieve
 *     responses:
 *       200:
 *         description: Prescription details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Prescription'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Not the owner of the prescription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Prescription not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */ 