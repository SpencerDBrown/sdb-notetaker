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


const handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
};

const handleNewNoteView = function () {
    actriveNote = $(this).data();
    renderActiveNote();
};

const handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.show();
    } else {
        $saveNoteBtn.show();
    }
};

const renderNoteList = (notes) => {
    $noteList.empty();

    const noteListItems = [];

    const create$li = (text, withDeleteButton = true) => {
        const $li = $("<li class='list-group-item'>");
        const $span = $("<span>").text(text);
        $li.append($span);

        if (withDeleteButton) {
            const $delBtn = $(
                "<i class = 'fas fa-trash-alt float-right text-danger delete-note'>"
            );
            $li.append($delBtn);
        }
        return $li;
    };

    if (notes.length === 0) {
        noteListItems.push(create$li("There are no saved notes.", false));
    }

    notes.forEach((note) => {
        const $li = creat$li(note.title).data(note);
        noteListItems.push($li);
    });

    $noteList.append(noteListItems);
};

const getAndRenderNotes = () => {
    let returned = getNote();
    console.log(returned)
    return getNotes().then(renderNoteList);
}

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();