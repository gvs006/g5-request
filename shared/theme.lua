-- Theme configuration for g5-request NUI
-- Users can edit these values. Colors accept CSS formats like
-- '#rrggbb', '#rrggbbaa' or 'rgba(r,g,b,a)'.

Theme = {
    -- main card and text
    card_bg = '#0f2a2f80',        -- background of the card
    title_bg = '#0b1a1bcc',       -- header/background behind tag/title
    text = '#e6eef0',            -- primary text
    muted = '#9fb1b4',           -- muted text

    -- tag / code / progress defaults
    tag_bg = '#1abc9ccc',
    tag_fg = '#0b1a1b',
    code_bg = '#2d9cffff',
    code_fg = '#0b1a1b',
    progress_bg = 'rgba(255,255,255,0.06)',
    progress_color = '#2d9cff',

    -- sizing
    card_width = '380px',
    card_gap = '10px',
}

return Theme
