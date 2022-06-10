const $noteTitle = $(" .note-title");
const $noteText = $(" .note-textarea");
const $saveNoteBtn = $(" .save-note");
const $newNoteBtn = $(" .new-note");
const $noteList = $(" .list-container .list group")

let activeNote = {};

const getNotes = () => {
    return $.ajax({
        url: "/api/notes",
        method: "GET",
    });
};

const saveNote = (note) => {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST",
    });
};

const deleteNote = (id) => {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE",
    });
};

const makeRandomID = () => {
    let symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let randomStr = "note-";

    for(let i = 0; i < 6; i++) {
        randomStr += symbols.charAt(Math.floor(Math.random()*symbols.length));
    }
    return randomStr;
}

const renderActiveNote = () => {
    $saveNoteBtn.hide();

    if (activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
      } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
      }
};

const handleNoteSave = function () {
    const newNote = {
        title: $noteTitle.val(),
        text: $noteText.val(),
        id: makeRandomID90
    };

    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

