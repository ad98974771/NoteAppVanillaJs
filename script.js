"use strict";

// Dynamic html elements
let notesCounterDiv = `<div class="notes-counter">1 Notes</div></div>`;

// Elements to interact
let startTappingButton = document.querySelector('.start-typing');
let sideBarNotesWindow = document.querySelector('.side-bar-notes-window');
let newNotesIcon = document.querySelector('.new-notes-icon');
let notesCounter = document.querySelector('.notes-counter');
let textArea = document.querySelector('.textarea');
let welcomeScreen = document.querySelector('.first-screen');
let notesWindow = document.querySelector('.notes-window');

// EventListeners
startTappingButton.addEventListener('click', hideWelcomeScreen);
newNotesIcon.addEventListener('click', createNewNote);

let arr = [];

// Functions
function hideWelcomeScreen() {
  welcomeScreen.classList.add('hidden');
  showNewNoteArea();
  showEmptyNoteTab();
}

function showNewNoteArea(){
  let textAreaDiv = `<div class="typing-screen"><div class="datetime lato-light">${dateTimeForNotes()}</div><textarea class="textarea lato-light" name="" id="textarea" tabindex="0"></textarea></div>`;
  let el = document.querySelector('.notes-window');
  el.innerHTML = textAreaDiv;
  let justCreatedEl = document.getElementById('textarea');
  justCreatedEl.focus()
  justCreatedEl.addEventListener('blur', function(event){
    saveText(event);
  });
}

// Фикс если минуты <10
function dateTimeForNotes(){
  let months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  let timeNow = new Date();
  let date = timeNow.getDate();
  let month = months[timeNow.getMonth()];
  let year = timeNow.getFullYear();
  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let time = `${date} ${month} ${year} at ${hours}:${minutes}`
  return time
}

function dateTimeForTabs(){
  let timeNow = new Date();
  let hours = timeNow.getHours();
  let minutes = timeNow.getMinutes();
  let time = `${hours}:${minutes}`
  return time
}

function showEmptyNoteTab(){
  let emptyTab = `<div class="new-note"><div class="new-note-hader">New Note</div><div class="new-note-wrapper"><div class="new-note-date">${dateTimeForTabs()}</div><div class="new-note-description"> No additional info...</div></div></div>`;
  sideBarNotesWindow.insertAdjacentHTML('afterbegin', emptyTab);
}

function saveText(event) {
  let textArea = event.target;
  let noteText = textArea.value;
  
  let textForTitleStr = noteText.slice(0, 15)
  let textForDescriptionStr = noteText.slice(0, 30)

  let newNoteHeader = document.querySelector('.new-note-hader');
  let newNoteDescription = document.querySelector('.new-note-description');     
  
  if (textForTitleStr.trim() === '') {
    textForTitleStr = 'New Note'; }

  if (textForDescriptionStr.trim() === '') {
    textForDescriptionStr = 'No additional info...'; }

  let newNoteObj = {
    id: null,
    fullText: noteText,
    title: textForTitleStr,
    description: textForDescriptionStr,
  }

  arr.push(newNoteObj);

  newNoteHeader.textContent = newNoteObj.title;  
  newNoteDescription.textContent = newNoteObj.description;

  let newNoteTab = document.querySelector('.new-note');
  newNoteTab.addEventListener('click', renderNotesContainer);
}

function createNewNote(){
// Сохранить id предыдущей заметки в массив и добавить в элемент new-notes
  let id = Date.now();
  let lastObj = arr.at(-1);
  lastObj.id = id;
  let newNotes =  document.querySelector('.new-note')
  newNotes.id = id;

  // Получить список всех див внутри окна редактора и применить класс remove
  let notesWindow = document.querySelector('.notes-window');
  let allElements = notesWindow.querySelectorAll('*');
  allElements.forEach((item) => item.remove())

  showEmptyNoteTab();
  showNewNoteArea();

  let newNoteTab = document.querySelector('.new-note');
  newNoteTab.addEventListener('click', renderNotesContainer);
}

function renderNotesContainer(event){
  const parentNode = event.target.closest('.new-note');
  let id = Number(parentNode.id)

  let selectedObj = arr.find((item) => item.id === id)

  let textAreaDiv = `<div class="typing-screen"><div class="datetime lato-light">Write func to get time</div><textarea class="textarea lato-light" name="" id="textarea" tabindex="0">${selectedObj.fullText}</textarea></div>`;
  let el = document.querySelector('.notes-window');
  el.innerHTML = textAreaDiv;
  let justCreatedEl = document.getElementById('textarea');

  justCreatedEl.addEventListener('blur', function(event){
    let textArea = event.target;
    let noteText = textArea.value;
    
    let textForTitleStr = noteText.slice(0, 15)
    let textForDescriptionStr = noteText.slice(0, 30)
  
    selectedObj.fullText = noteText;
    selectedObj.title = textForTitleStr;
    selectedObj.description = textForDescriptionStr;

    let parentNode2 = document.getElementById(id) 
    let title = parentNode2.querySelector('.new-note-hader')
    let description = parentNode2.querySelector('.new-note-description')

    title.textContent = textForTitleStr;
    description.textContent = textForDescriptionStr;

    deleteNote(selectedObj, parentNode)
  });

}

function deleteNote(obj, area){
  if (obj.fullText.trim() === ''){
    console.log(area)
    area.remove();
  }

  let id = Number(obj.id)
  arr = arr.filter((item) => item.id !== id)
  console.log(arr)
}