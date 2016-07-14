




















declare module powerbi.visuals.telemetry {
    /**
     * Creates a client-side Guid string.
     * @returns A string representation of a Guid.
     */
    function generateGuid(): string;
}

declare module powerbi.visuals.telemetry {
    interface IPBIVisualApiUsage extends ICustomerAction {
        name: string;
        apiVersion: string;
        custom: boolean;
    }
    /**
    * Event fired when a visual is loaded through the VisualSafeExecutionWrapper
    * @param name Name (guid) of the visual.
    * @param apiVersion Api version used by the visual.
    * @param custom Is the visual custom?
    * @param parentId Id of the parent event
    * @param isError True - action failed.
    * @param errorSource Source of the error. PowerBI = PowerBI has a problem, External = External Service (e.g. on-prem AS server is down), User = User error (e.g. uploading too much and hitting resource limitations.
    * @param errorCode PowerBI Error Code
    *
    * Generated by: commonTelemetryEvents.bond
    */
    var VisualApiUsageLoggers: number;
    var VisualApiUsage: (name: string, apiVersion: string, custom: boolean, parentId: string, isError?: boolean, errorSource?: ErrorSource, errorCode?: string) => ITelemetryEventI<IPBIVisualApiUsage>;
    /**
    * Event fired for uncaught exception in IVisual.
    * @param visualType Type of the visual.
    * @param isCustom Is the visual custom?
    * @param apiVersion Api version used by the visual
    * @param source Source URL
    * @param lineNumber Line number
    * @param columnNumber Column number
    * @param stack Stack trace
    * @param message Error exception message.
    *
    * Generated by JsCommon/commonTelemetryEvents.bond
    */
    var VisualExceptionLoggers: number;
    var VisualException: (visualType: string, isCustom: boolean, apiVersion: string, source: string, lineNumber: number, columnNumber: number, stack: string, message: string) => ITelemetryEventI<IPBIVisualException>;
}

declare module powerbi.extensibility {
    function VisualPlugin(options: IVisualPluginOptions): ClassDecorator;
}

declare module powerbi.extensibility {
    import IPoint = visuals.IPoint;
    interface SelectionManagerOptions {
        hostServices: IVisualHostServices;
    }
    class SelectionManager implements ISelectionManager {
        private selectedIds;
        private hostServices;
        private promiseFactory;
        constructor(options: SelectionManagerOptions);
        select(selectionId: ISelectionId, multiSelect?: boolean): IPromise<ISelectionId[]>;
        showContextMenu(selectionId: ISelectionId, position: IPoint): IPromise<{}>;
        hasSelection(): boolean;
        clear(): IPromise<{}>;
        getSelectionIds(): ISelectionId[];
        private sendSelectionToHost(ids);
        private sendContextMenuToHost(selectionId, position);
        private getSelectorsByColumn(selectionIds);
        private selectInternal(selectionId, multiSelect);
        static containsSelection(list: ISelectionId[], id: ISelectionId): boolean;
    }
}

declare module powerbi.extensibility {
    /**
     * This class is designed to simplify the creation of SelectionId objects
     * It allows chaining to build up an object before calling 'create' to build a SelectionId
     */
    class SelectionIdBuilder implements ISelectionIdBuilder {
        private dataMap;
        private measure;
        withCategory(categoryColumn: DataViewCategoryColumn, index: number): this;
        withSeries(seriesColumn: DataViewValueColumns, valueColumn: DataViewValueColumn | DataViewValueColumnGroup): this;
        withMeasure(measureId: string): this;
        createSelectionId(): ISelectionId;
        private ensureDataMap();
    }
}

declare module powerbi.extensibility {
    import ITelemetryService = visuals.telemetry.ITelemetryService;
    let visualApiVersions: VisualVersion[];
    function createVisualAdapter(visualPlugin: IVisualPlugin, telemetryService?: powerbi.ITelemetryService | ITelemetryService): powerbi.IVisual;
    class VisualAdapter implements powerbi.IVisual, WrappedVisual {
        private visual;
        private apiVersionIndex;
        private plugin;
        private telemetryService;
        private legacy;
        isPluginInError: boolean;
        constructor(visualPlugin: IVisualPlugin, telemetryService?: ITelemetryService);
        init(options: powerbi.VisualInitOptions): void;
        update(options: powerbi.VisualUpdateOptions): void;
        destroy(): void;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        enumerateObjectRepetition(): VisualObjectRepetition[];
        onResizing(finalViewport: IViewport, resizeMode: ResizeMode): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onViewModeChanged(viewMode: ViewMode): void;
        onClearSelection(): void;
        canResizeTo(viewport: IViewport): boolean;
        unwrap(): powerbi.IVisual;
        private visualNew;
        private visualLegacy;
        private visualHasMethod(methodName);
        private getVersionIndex(version);
        private overloadMethods();
        private getCompiledOverloads();
    }
}

declare module powerbi.extensibility {
    /**
     * Translates visual plugin produced by pbiviz cli tools
     * The function mutates the plugin
     *
     * TODO: add separate capabilities interfaces and versioning support
     */
    function translateVisualPlugin(plugin: IVisualPlugin): void;
}

declare module powerbi.extensibility {
    import ITelemetryService = visuals.telemetry.ITelemetryService;
    class VisualSafeExecutionWrapper implements powerbi.IVisual, WrappedVisual {
        private wrappedVisual;
        private visualPlugin;
        private telemetryService;
        private isPluginInError;
        private silent;
        private perfLoadEvent;
        constructor(wrappedVisual: powerbi.IVisual, visualPlugin: IVisualPlugin, telemetryService: ITelemetryService, isPluginInError: boolean, silent?: boolean);
        init(options: VisualInitOptions): void;
        destroy(): void;
        update(options: powerbi.VisualUpdateOptions): void;
        onResizing(finalViewport: IViewport, resizeMode: ResizeMode): void;
        onDataChanged(options: VisualDataChangedOptions): void;
        onViewModeChanged(viewMode: ViewMode): void;
        onClearSelection(): void;
        canResizeTo(viewport: IViewport): boolean;
        enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
        enumerateObjectRepetition(): VisualObjectRepetition[];
        unwrap(): powerbi.IVisual;
        isCustomVisual(): boolean;
        private executeSafely(callback);
    }
}

declare module powerbi.extensibility.v100 {
    function convertLegacyUpdateType(options: powerbi.VisualUpdateOptions): VisualUpdateType;
}

declare module powerbi.extensibility.v110 {
}
