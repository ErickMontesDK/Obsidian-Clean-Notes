import { ViewPlugin, Decoration, WidgetType } from "@codemirror/view";
import { RangeSet } from "@codemirror/state";
import { syntaxTree } from "@codemirror/language";

import { splitAndTrimString, searchString, getHighlightedLines, getLanguageIcon, getLanguageName, isExcluded } from "./Utils";

export function codeblockHighlight(settings: CodeblockCustomizerSettings) {
  const viewPlugin = ViewPlugin.fromClass(
    class CodeblockHighlightPlugin {
      decorations: DecorationSet;
      settings: CodeblockCustomizerSettings;
      prevAlternateColors: ColorSettings[];
      view: EditorView;
      mutationObserver: MutationObserver;
      prevBGColor: string;
      prevHLColor: string;
      prevExcludeLangs: string;
      prevTextColor: string;
      prevBackgroundColor: string;
      prevHighlightGutter: boolean;
      prevLineNumbers: boolean;

      constructor(view: EditorView) {
        this.initialize(view, settings);
      }

      initialize(view: EditorView, settings: CodeblockCustomizerSettings) {
        this.view = view;
        this.settings = settings;
        this.decorations = this.buildDecorations(view);
        this.prevAlternateColors = [];
        this.mutationObserver = setupMutationObserver(view, this);
        this.prevBGColor = '';
        this.prevHLColor = '';
        this.prevExcludeLangs = '';
        this.prevTextColor = '';
        this.prevBackgroundColor = '';
        this.prevHighlightGutter = false;
        this.prevLineNumbers = false;
      }// initialize

      forceUpdate(editorView: EditorView) {
        this.view = editorView;
        this.decorations = this.buildDecorations(this.view);
        this.view.requestMeasure();
      }// forceUpdate

      shouldUpdate(update: ViewUpdate) {
        return (update.docChanged || update.viewportChanged || !this.compareSettings());
      }// shouldUpdate

      compareSettings() {
        return (
          this.settings.backgroundColor === this.prevBGColor &&
          this.settings.highlightColor === this.prevHLColor &&
          this.settings.ExcludeLangs === this.prevExcludeLangs &&
          compareArrays(this.settings.alternateColors, this.prevAlternateColors) &&
          this.settings.gutterTextColor === this.prevTextColor &&
          this.settings.gutterBackgroundColor === this.prevBackgroundColor &&
          this.settings.bGutterHighlight === this.prevHighlightGutter &&
          this.settings.bEnableLineNumbers === this.prevLineNumbers
        );
      }// compareSettings
      
      updateSettings() {
        this.prevBGColor = this.settings.backgroundColor;
        this.prevHLColor = this.settings.highlightColor;
        this.prevExcludeLangs = this.settings.ExcludeLangs;
        this.prevAlternateColors = this.settings.alternateColors.map(({name, currentColor}) => {
          return {name, currentColor};
        });
        this.prevTextColor = this.settings.gutterTextColor;
        this.prevBackgroundColor = this.settings.gutterBackgroundColor;
        this.prevHighlightGutter = this.settings.bGutterHighlight;
        this.prevLineNumbers = this.settings.bEnableLineNumbers;
      }// updateSettings

      update(update: ViewUpdate) {
        if (this.shouldUpdate(update)) {
          this.updateSettings();
          this.decorations = this.buildDecorations(update.view);
        }
      }// update

      destroy() {
        this.mutationObserver.disconnect();
      }// destroy

      filterVisibleCodeblocks(view: EditorView, codeblocks: Codeblock[]): Codeblock[] {
        return codeblocks.filter((codeblock) => {
          return view.visibleRanges.some((visibleRange) => {
            return (codeblock.from < visibleRange.to && codeblock.to > visibleRange.from);
          });
        });
      }// filterVisibleCodeblocks

      deduplicateCodeblocks(codeblocks: Codeblock[]): Codeblock[] {
        const deduplicatedCodeblocks = [];
        for (let i = 0; i < codeblocks.length; i++) {
          if (i === 0 || codeblocks[i].from !== codeblocks[i - 1].from) {
            deduplicatedCodeblocks.push(codeblocks[i]);
          }
        }
        return deduplicatedCodeblocks;
      }// deduplicateCodeblocks
  
      buildDecorations(view: EditorView): DecorationSet {
        let lineNumber = 1;
        let HL = [];
        let altHL = [];
        const BgColor = this.settings.backgroundColor;
        const HLColor = this.settings.highlightColor;
        const Exclude = this.settings.ExcludeLangs;
        const bGutter = this.settings.bEnableLineNumbers;
        const ExcludeLangs = splitAndTrimString(Exclude);
        let bExclude = false;
        const alternateColors = this.settings.alternateColors || [];
        const GutterBackgroundColor = this.settings.gutterBackgroundColor;
        const GutterHighlight = this.settings.bGutterHighlight;
        const GutterTextColor = settings.gutterTextColor;
        const bDisplayCodeBlockLanguage = this.settings.bDisplayCodeBlockLanguage;
        const bDisplayCodeBlockIcon = this.settings.bDisplayCodeBlockIcon;
        const bAlwaysDisplayCodeblockLang = this.settings.header.bAlwaysDisplayCodeblockLang;
        const bAlwaysDisplayCodeblockIcon = this.settings.header.bAlwaysDisplayCodeblockIcon;
        const linenumbers = this.settings.bEnableLineNumbers;
        const decorations = [];

        if (!view.visibleRanges || view.visibleRanges.length === 0) {
          return RangeSet.empty;
        }
          
        // Find all code blocks in the document
        const codeblocks = findCodeblocks(view.state, view.state.doc.from, view.state.doc.to);
        // Find code blocks that intersect with the visible range
        const visibleCodeblocks = this.filterVisibleCodeblocks(view, codeblocks);
        // remove duplicates
        const deduplicatedCodeblocks = this.deduplicateCodeblocks(visibleCodeblocks);

        for (const codeblock of deduplicatedCodeblocks) {
          syntaxTree(view.state).iterate({ from: codeblock.from, to: codeblock.to,
            enter(node) {
              const line = view.state.doc.lineAt(node.from);
              const lineText = view.state.sliceDoc(line.from, line.to);
              const lang = searchString(lineText, "```");
              if (lang)
                bExclude = isExcluded(lineText, settings.ExcludeLangs);
              if (node.type.name.includes("HyperMD-codeblock-begin") ) {
                if (bExclude)
                  return;
                
                const params = searchString(lineText, "HL:");
                HL = getHighlightedLines(params);
                altHL = [];
                for (const { name, currentColor } of alternateColors) {
                  const altParams = searchString(lineText, `${name}:`);
                  altHL = altHL.concat(getHighlightedLines(altParams).map((lineNumber) => ({ name, currentColor, lineNumber })));
                }
                const radius = (bGutter) ? `border-top-left-radius: 0px` : "";
                decorations.push(Decoration.line({ attributes: {class: `codeblock-customizer-line-background`, style: `background-color: ${BgColor}; ${radius}`} }).range(node.from));
                
                if (linenumbers) {
                  const FileName = searchString(lineText, "file:");
                  const Fold = searchString(lineText, "fold");
                  const codeBlockLang = searchString(lineText, "```");
                  const isHeaderEnabled = ((FileName !== "" && FileName !== null) || Fold || ((bDisplayCodeBlockLanguage && bAlwaysDisplayCodeblockLang) || ( bDisplayCodeBlockIcon && bAlwaysDisplayCodeblockIcon && getLanguageIcon(getLanguageName(codeBlockLang))) && codeBlockLang)) ? true : false;
                  decorations.push(Decoration.line({ attributes: {class: `codeblock-customizer-gutter-line`} }).range(node.from));
                  decorations.push(Decoration.widget({ widget: new LineNumberWidget(" ", GutterBackgroundColor, GutterTextColor, true, false, isHeaderEnabled),}).range(node.from));
                }
              }
              if (node.type.name === "HyperMD-codeblock_HyperMD-codeblock-bg" ) {
                if (bExclude)
                  return;

                let backgroundClass = `codeblock-customizer-line-background`;
                let Color = BgColor;
                let GutterHLColor = GutterBackgroundColor;
                const altHLMatch = altHL.filter((hl) => hl.lineNumber === lineNumber);
                if (HL.includes(lineNumber)) {
                  backgroundClass = `codeblock-customizer-line-highlighted`;
                  Color = HLColor;
                } else if (altHLMatch.length > 0) {
                  backgroundClass = `codeblock-customizer-line-highlighted-${altHLMatch[0].name}`;
                  Color = altHLMatch[0].currentColor;
                }
                decorations.push(Decoration.line({ attributes: {class: backgroundClass, style: `background-color: ${Color};`} }).range(node.from));
                
                if (linenumbers) {
                  if (GutterHighlight && HL.includes(lineNumber)) {
                    GutterHLColor = HLColor;
                  } else if (GutterHighlight && altHLMatch.length > 0) {
                    GutterHLColor = altHLMatch[0].currentColor;
                  }                  
                  decorations.push(Decoration.line({ attributes: {class: `codeblock-customizer-gutter-line`} }).range(node.from));
                  decorations.push(Decoration.widget({ widget: new LineNumberWidget(lineNumber, GutterHLColor, GutterTextColor, false, false, false),}).range(node.from));
                }
                lineNumber++;
              }
              if (node.type.name.includes("HyperMD-codeblock-end") ) {
                if (bExclude){
                  bExclude = false;
                  return;
                }
                const radius = (bGutter) ? `border-bottom-left-radius: 0px` : "";
                decorations.push(Decoration.line({ attributes: {class: `codeblock-customizer-line-background`, style: `background-color: ${BgColor}; ${radius}`} }).range(node.from));

                if (linenumbers) {
                  decorations.push(Decoration.line({ attributes: {class: `codeblock-customizer-gutter-line`} }).range(node.from));
                  decorations.push(Decoration.widget({ widget: new LineNumberWidget(" ", GutterBackgroundColor, GutterTextColor, false, true, false),}).range(node.from));
                }
                lineNumber = 1;
              }                
            },
          });
        }
        return RangeSet.of(decorations, true);
      }
    },// CodeblockHighlightPlugin
    {
      decorations: (value) => value.decorations,
    }
  );

  viewPlugin.name = 'codeblockHighlight';
  return viewPlugin;
}// codeblockHighlight

function compareArrays(array1, array2) {
  
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if ((array1[i].name !== array2[i].name) || (array1[i].currentColor !== array2[i].currentColor)) {
      return false;
    }
  }
  return true;
}// compareArrays

class LineNumberWidget extends WidgetType {
  constructor(private lineNumber: number, private backgroundColor: string, private GutterTextColor: string, private bFirstLine: boolean, private bLastLine: boolean, private isHeaderEnabled: boolean) {
    super();
  }

  eq(other: LineNumberWidget) {
    return this.lineNumber === other.lineNumber && this.textColor === other.textColor && this.backgroundColor === other.backgroundColor && other.GutterTextColor === this.GutterTextColor;
  }

  toDOM(view: EditorView): HTMLElement {
    const container = document.createElement("span");
    container.classList.add("codeblock-customizer-gutter-container");
    container.style.setProperty("--codeblock-customizer-gutter-color", this.backgroundColor);

    const span = document.createElement("span");
    span.classList.add("codeblock-customizer-gutter");
    if (this.bFirstLine && !this.isHeaderEnabled)
      span.classList.add("codeblock-customizer-gutterElements-first-radius");
    if (this.bLastLine)
      span.classList.add("codeblock-customizer-gutterElements-last-radius");
    span.style.setProperty("--codeblock-customizer-gutter-textColor", this.GutterTextColor);
    
    span.innerText = `${this.lineNumber}`;

    container.appendChild(span);

    return container;
  }
}// LineNumberWidget

function findCodeblocks(doc: Text, from: number, to: number): SyntaxNode[] {
  const tree = syntaxTree(doc);
  const codeblocks: SyntaxNode[] = [];

  tree.iterate({ from, to,
    enter: (node) => {
      if (
        node.type.name.includes("HyperMD-codeblock-begin") ||
        node.type.name === "HyperMD-codeblock_HyperMD-codeblock-bg" ||
        node.type.name.includes("HyperMD-codeblock-end")
      ) {
        codeblocks.push(node);
      }
    },
  });

  return codeblocks;
}// findCodeblocks

function setupMutationObserver(editorView: EditorView, pluginInstance: any) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        (mutation.target.classList.contains("HyperMD-codeblock-begin") ||
          mutation.target.classList.contains("HyperMD-codeblock_HyperMD-codeblock-bg") ||
          mutation.target.classList.contains("HyperMD-codeblock-end"))
      ) {
        pluginInstance.forceUpdate(editorView);
      }
    }
  });

  observer.observe(editorView.dom, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['class'], // Only observe changes to the 'class' attribute
  });

  return observer;
} // setupMutationObserver
