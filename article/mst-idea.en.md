---
cite:
  - "Murtaugh, Charles K. 1967. 'Specification Trees - A Tool for Management.' SAE International. https://doi.org/10.4271/670640."
  - "Beck, Kent, et al. 2001. 'Manifesto for Agile Software Development.' https://agilemanifesto.org/."
  - "Hsue-Shen Tsien. *On Systems Engineering*. Shanghai Jiao Tong University Press, 2007."
  - "Friedenthal, Sanford, Alan Moore, and Rick Steiner. *Practical Guide to SysML: The Systems Modeling Language*. Amsterdam: Academic Press, 2008."
  - "OpenAI. 2023. 'Function Call API.' https://platform.openai.com/docs/guides/function-calling."
  - "Anthropic. 2024. 'Introducing the Model Context Protocol.' https://www.anthropic.com/news/model-context-protocol."
  - "OpenAI. 2025. 'Introducing the Model Spec.' https://openai.com/index/introducing-the-model-spec/."
  - "Grove, Sean. 2025. 'The New Code.' Presented at The AI Engineer World's Fair. https://www.youtube.com/watch?v=8rABwKRsec4."
---

# Model Specification Tree, the Idea

The idea of Model Specification Tree (MST) combines Large Language Models (LLMs) with Specification Trees—using LLMs' ability to understand descriptions and generate outputs to automate steps in such systems engineering management methodology. This may reduce manual work in LLMs' workflow cycles and improves output quality.

## 0. Preface

Today, large language model (LLM) technology has advanced significantly. For over a century, systems engineering management methodologies (especially for design and R&D) have built up a lot of knowledge, even when limited by human labor resources in the past. But now, with the help of LLMs, many detailed management methods that were too costly for humans to use are becoming possible. These methods might be able to help LLMs to handle more complex tasks, give better feedback, and produce more consistent results -- letting humans focus on ideas and creativity, only stepping in when necessary.

This article is neither standard proposal nor any existing application implementations. It’s just an idea about combining LLMs and systems engineering, with many parts still working in progress, so don’t expect to find any answers you wish here. While the author is trying to validate the idea, this article is only about the idea itself. The author intends this concept to remain unconstrained by any software, product, or platform (even including the ones developed by the author himself), so that this article had been open-sourced for everyone to access once the author conceiving such idea.

## 1. Concepts and Methods

The Large Language Models (LLMs) or Artificial Intelligence (AI) discussed here must be able to: read and understand natural language inputs, generate accurate outputs in natural language or other human-readable formats in most scenarios, and possess basic common sense. The requirement is relatively flexible here, such as even the accuracy is slightly lower than humans is acceptable. At the time of writing, many available LLMs had already meet these criteria.

The **Specification Tree** here originates from systems engineering management methodologies, distinct from the "Specification Tree" in industrial modeling softwares. It involves structuring a system’s performance parameters to clarify requirements and technical specifications hierarchically. Similar ideas emerged in some 1960s researches, but this article’s Specification Tree refines the concept: breaking tasks into a tree structure until reaching minimal units that can be completed or deemed failed within a short continuous timeframe, then executing recursively and requesting intervention upon failure.

MST itself is only a management methodology or idea, not a standalone application. Practical implementation requires Specifications focused on specific needs to guide the model’s outputs. In practice, the model’s pre-trained knowledge serves only as foundational common sense for natural language understanding, and all operations must follow those detailed specifications. There are usually many specifications prepared as a Specification Library, which is also supposed to support reading, writing, storage, and retrieval.

Specifications defined here prescribe only three valid output types:

1. `done`: Directly output the result.
2. `tree`: Output a list of subtasks.
3. `fail`: Request human intervention. Unrecognizable ones default to `fail`.

So here is the steps:

1. Extract keywords to retrieve and select relevant specifications.
2. Generate output according to the specification.
3. Identify the output types listed above programmatically.
4. If output is `tree`, recursively apply this process to each subtask.

## 2. Structure of Specifications

Specifications are structurally divided into three parts:

1. Title (Name): For human readability and visualization.
2. Abstract (Description): Helps the model to determine relevance.
3. Article (Content): Guides the model’s specific execution and output.

While these parts could be stored in a single file, they are supposed to be called individually for different scenarios: the abstract is provided when the model selects specifications, and only the content is included in prompts during execution (without the title and abstract).

This structure resembles Function Call and Model Context Protocol (MCP) but uses Markdown instead of JSON for better human and model readability. And unlike MCP, all other metadata, such as identifier and keywords are recommended to be included into the source data structure, as they can be managed dynamically and automatically, and even the specification developers don't need to concern about those data fields.

Such standardized structure encompassing title, abstract, and content originally stems from the academic paper format that has been in use for over a century. Papers written in this structure have existed across various carriers, from handwritten manuscripts and printed versions to computer softwares. And they had been indexed and utilized extensively in diverse environments from libraries, to database software, and then internet search engines. The vast volume of academic papers carried by this structure has driven technological progress across multiple eras over the past hundred years, which sufficiently demonstrates its maturity. Adopting such a data structure recording specification in the further implementation of the Model Specification Tree (MST) aligns with traditional practices and facilitates compatibility with, as well as reuse of, the accumulated achievements from previous human development.

## 3. Tree-structured Decomposition

WIP...
