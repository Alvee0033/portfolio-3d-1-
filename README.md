# 3D Portfolio Website

A personal portfolio website for Morsalin Islam Alvee featuring 3D elements, animations, and responsive design.

## Features

- Interactive 3D background using Three.js
- Responsive design for all device sizes
- Custom cursor and animations
- Sections for Bio, Skills, Education, Projects, and Contact
- GitHub Pages ready deployment

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript
- Three.js for 3D elements

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Create a new repository on GitHub
2. Initialize it with a README file

### Step 2: Upload the Files

1. Clone the repository to your local machine
2. Copy all the files from this project into the repository folder
3. Make sure the `.nojekyll` file is included to prevent GitHub Pages from processing the site with Jekyll

### Step 3: Configure GitHub Pages

1. Go to your repository settings
2. Scroll down to the "GitHub Pages" section
3. Select the branch you want to deploy (usually `main` or `master`)
4. Click "Save"

### Step 4: Access Your Website

Your website will be available at `https://[your-username].github.io/[repository-name]/`

## Customization

### Profile Image

Replace the file at `assets/images/profile-image.png` with your own profile image.

### 3D Models

If you want to use custom 3D models, place them in the `assets/models/` directory and update the references in `js/three-scene.js`.

### Content

Update the content in `index.html` to reflect your personal information, skills, education, projects, and contact details.

## Local Development

To run the website locally, you can use any local server. For example:

1. Install Node.js
2. Install a simple HTTP server: `npm install -g http-server`
3. Navigate to the project directory in your terminal
4. Run `http-server`
5. Open your browser and go to `http://localhost:8080`

## License

This project is open source and available under the [MIT License](LICENSE).

