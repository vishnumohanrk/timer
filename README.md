# Timer App Assignment

## **Project Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/vishnumohanrk/timer.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the application

   ```bash
   npm run build
   ```

4. Start the application:

   ```bash
   npm run preview
   ```

5. Run tests:
   ```bash
   npm test
   ```

---

## Screenshots

### Home

![desktop](https://github.com/user-attachments/assets/6ba749ed-723f-4a72-a071-27aed8d62583)
![mobile](https://github.com/user-attachments/assets/e4beb6ad-f956-4b0f-9680-6188ff06a48a)

### Toast

![desktop-toast](https://github.com/user-attachments/assets/5706e45d-3e89-4ca8-b2f9-02a949377bf3)
![mobile-toast](https://github.com/user-attachments/assets/31006102-c95f-4ed4-b344-7d00ab530785)

### Form Modals

![Add Form](https://github.com/user-attachments/assets/c6de4b2f-4d77-4a19-ab34-6cce3031abab)
![Edit Form](https://github.com/user-attachments/assets/59512c28-2ab5-424c-a38b-ad59dc6b26c8)

## Changes

- added modal atom component
- added button and icon button atom components
- added form field related atom components
- added timer form component
- change toast position as per screen size
- sync timers state to localstorage
- continue playing the notification sound until timer complete toast is dismissed

---

- fixed app heading and its spacing as per screenshot
- fixed toast dismiss action
- refactored add timer and edit timer components to use the timer form and the modal and button atom components
- added htmlFor and Ids to form fields
- allow mutiple timers to run simultaneously

---

- added tests for timer form submission validation function
- added tests for TimerForm component

## Disclosures

- Couldn't write more tests due to time constraints
