---
author: James Aprosail
cites:
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

The idea of Model Specification Tree (MST) combines Large Language Models (LLMs) with Specification Trees -- using LLMs' ability to understanding descriptions and generating outputs, to automate steps in such systems engineering management methodology. This may reduce manual work in LLMs' workflow cycles and improve output quality.

## 0. Preface

Today, large language model (LLM) technology has advanced significantly. For over a century, systems engineering management methodologies (especially for design and R&D) have built up a lot of knowledge, even when limited by human labor resources in the past. But now, with the help of LLMs, many detailed management methods that were too costly for humans to use are becoming possible. These methods might be able to help LLMs to handle more complex tasks, give better feedback, and produce more consistent results -- letting humans focus on ideas and creativity, only stepping in when necessary.

This article is neither standard proposal nor any existing application implementations. It’s **just an idea** about combining LLMs and systems engineering, with many parts still working in progress, so don’t expect to find all answers you wish here. While the author is trying to validate the idea by coding, this article is only about the idea itself. The author intends this concept to remain unconstrained by any software, product, or platform (even including the ones developed by the author himself), so that this article has been open-sourced for everyone to access once conceiving such idea.

## 1. Concepts and Methods

The Large Language Models (LLMs) or Artificial Intelligence (AI) discussed here must be able to: read and understand natural language inputs, generate accurate outputs in natural language or other human-readable formats in most scenarios, and possess basic common sense. The requirement is relatively flexible here, even the accuracy slightly lower than the humans' are acceptable. At the time of writing, many available LLMs had already met these criteria.

The **Specification Tree** here originates from systems engineering management methodologies, distinct from the "Specification Tree" in some industrial modeling software. It involves structuring a system’s performance parameters to clarify requirements and technical specifications hierarchically. Similar ideas emerged early in some 1960s research, but this article’s specification tree refines the concept: breaking tasks into a tree structure until reaching minimal units that can be completed or deemed failed within a short continuous timeframe, then executing recursively and requesting intervention upon failure.

MST itself is only a management methodology or idea, not any standalone application. Practical implementation requires corresponding **Specifications** to guide the LLM’s outputs. In practice, the model’s pre-trained knowledge serves only as foundational common sense for natural language understanding, and all operations must follow those detailed specifications. There are usually many specifications prepared as a **Specification Library**, which is also supposed to support reading, writing, storage, and retrieval.

Specifications defined here prescribe only three valid output types:

1. `done`: Directly output the result.
2. `tree`: Output a list of subtasks.
3. `fail`: Request human intervention. Unrecognizable ones default to `fail`.

So here are the steps:

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

This structure resembles Function Call and Model Context Protocol (MCP) but uses Markdown instead of JSON for better human and model readability. Specifications such as MCP recommends include metadata such as identifier and keywords, but those data are not suggested to include in the source code of the specifications to avoid unnecessary information redundant. Identifiers and tags are supposed to be managed by the software system automatically, and specification developers don't need to concern about those fields.

Such standardized structure encompassing title, abstract, and content originally stems from the academic paper format that has been in use for over a century. Papers written in this structure have existed across various carriers, from handwritten manuscripts and printed versions to computer softwares. And they had been indexed and utilized extensively in diverse environments from libraries, to database software, and then internet search engines. The vast volume of academic papers carried by this structure has driven technological progress across multiple eras over the past hundred years, which sufficiently demonstrates its maturity. Adopting such data structure recording specification in the further implementation of the MST aligns with traditional practices and facilitates compatibility with, as well as reuse of, the accumulated achievements from previous human development.

## 3. Tree-structured Decomposition

Nowadays, LLMs (and even the human themselves) are better at completing specific and clear tasks. The more accurate the description of the prompt, the higher the accuracy of its completion. Conversely, when facing highly abstract and vague task requirement descriptions, having to provide output quickly without sufficient information prompts, then both LLMs and humans will be error-prone. Therefore, it is necessary to **decompose** complex tasks into simpler ones.

After hierarchical and recursive decomposition, each task node will have zero or multiple subtask nodes (usually not a single one), which forms a tree-structure called a **Specification Tree**. The ultimate effect of such decomposition is that the most detailed tasks can be completed in a single session, with only `done` or `fail` as the result. That is, the tasks that serve as the leaf nodes of the specification tree are indivisible (atomic), and can also be called **Atomic Tasks** or **Final Tasks**.

Task decomposition may enter a dead loop, meaning it may decompose endlessly (meaninglessly) and never be implemented into specific final tasks. Such situations need to be guarded. For example, the maximum allowable depth of decomposition can be set programmatically according to corresponding situation, that once exceeding such depth, external intervention (such as from humans) can be requested. In standardized prompts, it is also necessary to guide LLMs on when decomposition is possible, and if decomposition is not possible, you must request intervention.

## 4. Know What LLMs Cannot

In the workflow envisioned by MST, in addition to basic input and output functions, LLMs must also be able to recognize what they **cannot** do. Otherwise, they will easily fall into scenarios where they are "forced" to provide output conclusions without proper knowledge, and such scenarios are highly prone to generating so-called "hallucinations." This is not simply a matter of instructing LLMs to judge their own "ignorance" through prompts, because the model’s judgment of "not knowing" is a vague assessment. When tasks become complex, the errors caused by such vague judgments will be amplified and accumulated layer by layer, eventually leading to irreparable consequences.

The simplest (and most straightforward) engineering approach is to explicitly codify all possible operations into specifications. Any operation that cannot be retrieved from such specification library is deemed "unknown" or "unable to be completed." This method can more effectively ensure accuracy but may also require more human intervention. However, the need for human involvement due to an incomplete specification library is inherently necessary -- it serves to improve the specification library, which can be regarded as fixing faults caused by a lack of essential knowledge or information. In such scenarios, failing to introduce intervention would be a human error.

The core idea of MST never aims to allow software systems driven by LLMs (the AIs) to completely replace human works. Instead, it expects humans to be freed from simple, repetitive, and unnecessary labor (especially the mental effort of overthinking and hesitating in such tasks) and to focus their energy on creative and inspirational jobs. If a certain task cannot be completed even with all specification libraries in the world (i.e., all knowledge systems -- a topic on information barriers and knowledge monopoly will be discussed later -- this indicates that such a demand has exceeded the boundaries of current human knowledge systems, which requires further research.

## 5. Practice and Testing

The ultimate goal of LLMs' output is often to directly or indirectly influence the real world. Therefore, the judgment of its success or failure needs to be tested by practice in reality. Of course, to avoid further problems in actual usages, such practical testing needs to be advanced to the development stage, this is what we called **testing**. Such testing may occur at the physical level or the information level, and even in a vague logical description level. For example:

1. For mechanical products, they can be tested in the lab and judged whether they meet the requirements according to sensor parameters.
2. For computer programs, there are methods such as unit tests.
3. For imaginative works (such as fictions), verification can be conducted through literal logical reasoning and analysis.

Testing may often fail, but this does not mean manual intervention are required immediately. For example, when testing programs, we can directly submit the error report to the LLMs for analysis and then it can provide modifications. However, according to design philosophy mentioned above, even subsequent attempts after a test failure need to be guided by specifications. If there are no matching specifications to guide the situation after a test failure, it is regarded as a failure and intervention should be requested. And as such cycle of testing processes may fall into an infinite loop, we may set a threshold to guard the number of attempts. But the reason for the infinite loop is most likely a problem with the content of the specifications themselves, which may need to be improved.

## 6. Dynamic Planning

The generating process of a specification tree is not a one-time process: the design philosophy of MST also does not expect a fully implemented plan from the very beginning. Moreover, concerning methodologies such as Agile Development, it is easy to realize that completing the planning at the very beginning is impossible. That is to say, the specification tree will be dynamic and will have its original structure supplemented (or even modified) based on practical feedback during the execution process.

A stable and fixed plan can provide a better sense of security and control, but it is more likely to result in unfulfilled requirements. That a flexible plan is more adaptable to changes in circumstances (or even the requirements themselves) but will also increase the mental burden on people. Therefore, flexibility and stability are mutually exclusive: a balance needs to be found between them. Wanting the both, the one might achieve neither. The specific point of balance still needs to be analyzed based on specific issues, and there can be no clear answer in the assumptions of this article.

To ensure a better readability of dynamic responses, sufficient visualization implementation is also required in this regard. The relationships between task nodes of the specification tree should be displayed in a way with higher information entropy and is more ergonomic. This aspect is key to the software implementation about MST. If this is not done well, the negative impact on user experience will greatly hinder the realization of related assumptions.

## 7. Generate Specifications

As mentioned before, the application of MST relies heavily on the Specification Library itself. Even that soft applications are merely a kind of platform or shell, and **the specification content is the core**. Moreover, the specification content may even be natural language, which means organizing the design philosophy itself into text. This also achieves an effect similar to so-called zero-code development.

However, the specification text itself does not necessarily have to be written by humans. It is easy to imagine that LLMs can be used to automatically generate specifications based on user prompts. But even the generated specifications still need to comply with specific format and content requirements, that is, there must still be some "**Specifications to specify Specifications**". Furthermore, in specific implementations, it is often impossible to have only one specification document, instead, there will be a specification library composed of many optional specifications. Therefore, the project of writing and maintaining the specification library can also be regarded as a task requirement and entrusted to such MST application systems, thereby achieving the so-called "bootstrapping".

If such a process can be popularized, then future scientific research will become like this: humans only produce key inspirations and deal with problems beyond the scope of existing knowledge systems. Once prompt a few key sentences of inspiration, the corresponding software system will analyze, generate the test specifications, and call the corresponding test equipment to verify. After completing the feasibility verification, it will compile specifications, update the knowledge system, and then reuse existing specifications to realize similar needs when they arise again. This cycle continues.

## 8. Package Manager of Specifications

Most application scenarios require handling tasks that involve domain-specific knowledge, meaning the invoked specifications are mostly concentrated within a single category, and almost no involvement in other broader categories. Of course, it is possible to incorporate all knowledge systems into an internet search engine, but this can easily lead to being overwhelmed by a vast amount of irrelevant information, wasting significant screening costs, and also making it prone to reduced accuracy after being contaminated by harmful information. Therefore, there is a need to programmatically and hierarchically provide access to specification libraries, rather than treating them uniformly within the same index space.

In the field of coding, there are already mature **package management systems** that can serve as references. A similar approach can be adopted in specification management: integrating a series of specification files into a **package**, where each **workspace** references multiple packages as **dependencies**. The system will first retrieve all specification files within all dependencies of the workspace. And when there are no matched specifications to current task requirement, it then performs an online search based on actual circumstances or directly requests (human) intervention.

Naturally, such a package management system also requires a networked **package management platform** as support, to enable the reuse of existing specifications on a larger scale, even globally, and avoid redundant development. Such a platform may promote the open-source of specifications, similar to the current open-source ecosystem for programs, thereby facilitating more free development for all humanity and making it easier for everyone to reuse existing achievements. However, it could also be transformed into a profit-making tool that relies on knowledge monopoly with tiered payment models, macroscopically hindering scientific and technological progress. This, however, is not within the scope of this article, and only what we do and choose can influence the future.

## 9. History and Future

In the past, concepts related to systems engineering gave rise to numerous management methodologies, most of which required extensive document writing or form-filling. In an era where editing relied solely on human effort -- even involving handwritten work and paper-based document organization -- such detailed and complex standardized management approaches obviously consumed massive amounts of human resources and time, leading to more losses than gains. Ultimately, they were eliminated in most fields. However, management methods driven by detailed standardized documents also have their advantages: they can better ensure the quality of outputs without excessive reliance on the personalities or qualities of specific individuals involved in production. Such management methods have been retained in industries and constructions that require quality and safety assurance over cost saving. But in faster-evolving, and cost-sensitive fields -- especially for software development -- they are no longer prevalent, having been simplified by modern methodologies such as "agile development."

Reducing costs and improving quality are often mutually exclusive in many scenarios. Detailed specifications can indeed ensure quality, but they also lead to increased costs, particularly labor costs. Even in the era when computer technology was underdeveloped, management costs could gradually exceed the costs of actual production. Furthermore, due to human limitations and lack of standardization, rigidity could set in. And in such systems, many people were forced to engage in rigid, rule-based execution work, stifling innovative thinking.

However, with the development of large language models (or so-called "artificial intelligence") to the current level, many document-related and rule-based tasks can now be handled by LLMs without the need for specific human involvement. Moreover, LLMs are better suited than humans for work that need to follow the rules rather than creativity. This has reintroduced possibilities for the once complex and detail-oriented, specification-driven management methods. Nowadays, the shortcomings of these methods can be addressed by large models and software tools, while humans can focus on innovation and management rather than execution -- free to unleash more creativity.

Today’s large language models are like such "humans":

1. **Can read and write** (understand natural language): today’s large language models can do this. They demonstrate a certain level of comprehension and intelligence. Regardless of whether this "intelligence" is real, whether it has self-awareness, or whether it meets those so-called "ethical" standards, it is usable in engineering scenarios where only inputs and outputs matter. Many large models can even process dozens of natural languages, far exceeding the average human capability.
2. **Basic common sense**: Most LLMs have basic common sense beyond average middle-school education. They are even able to write code in multiple programming languages without guidance from manuals -- again, far exceeding average human abilities.
3. **Extremely short memory**: Memory exists only within a single session. Once the context length limit is exceeded, all previous memory is cleared. However, if tasks are sufficiently fragmented, long-term memory is unnecessary. In practice, humans also cannot remember many details clearly and still rely on tools such as notebooks.
4. **Extremely fast reading speed**: Current large models read far faster than humans. Their speed is limited only by computing power. Even with ordinary cloud service APIs nowadays, a large model can read hundreds of thousands of words -- material that would take a human months to finish -- in minutes or even seconds. Thus, in many scenarios, large models do not need to memorize knowledge like humans, instead, they can "learn on the spot" when needed: quickly read all specifications, complete a single task rapidly, then forget everything, and re-read when necessary possibly the next time.
5. **Never get tired**: As long as there is sufficient power supply and enough computing devices.

Many current management methods, including methodologies like "agile development," and even related management applications and platforms, attempt to break down tasks into the finest possible granular steps -- similar to the "atomic requirements" mentioned before. Such abstract "humans" (LLMs) are clearly capable of handling these workflows. Even with APIs, large models can outperform humans by leveraging their input/output (I/O) speed advantages.

After being promoted, such MST applications are expected to largely replace simple, repetitive, and tedious human work in formalized management and research. They may further collaborate with programmable automated production lines and robots (embodied intelligence) to replace simple, repetitive human physical labor, enabling nearly automated production of sufficient goods necessary for all humans' eudemonia and welfare. Humans would then only need to focus on expanding knowledge boundaries and engaging in creative work, realizing the vision of "comprehensive and free development for all." However, there may be numerous risks in the implementation process, that we need to take care. But those are also within the scope of this article: what the future would be like depends on the choices and actions of all people now.
