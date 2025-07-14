export const get = async () => ({
  message: 'Hello Modern.js',
});

export const post = async () => ({
  message: 'Hello Modern.js',
});

// interface ContactFormData {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   country: string;
//   company: string;
//   companyEmail: string;
//   message: string;
// }

// export async function post(
//   data: RequestOption<ContactFormData>
// ) {
//   try {
//     const data: ContactFormData = await req.json();

//     // Validate required fields
//     const requiredFields: (keyof ContactFormData)[] = [
//       'firstName',
//       'lastName',
//       'phone',
//       'country',
//       'company',
//       'companyEmail',
//       'message'
//     ];

//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return res.status(400).json({
//           error: `${field} is required`
//         });
//       }
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(data.companyEmail)) {
//       return res.status(400).json({
//         error: 'Invalid email format'
//       });
//     }

//     // Log the form submission
//     console.log('Contact Form Submission:', {
//       timestamp: new Date().toISOString(),
//       ...data
//     });

//     // Here you would typically send this data to a database or external service
//     return res.status(200).json({
//       message: 'Form submitted successfully',
//       status: 'success'
//     });

//   } catch (error) {
//     console.error('Contact form submission error:', error);
//     return res.status(500).json({
//       error: 'Internal server error',
//       status: 'error'
//     });
//   }
// }
